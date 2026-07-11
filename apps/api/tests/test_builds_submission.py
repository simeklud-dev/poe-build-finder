from fastapi.testclient import TestClient
from sqlalchemy import select

from app.config import settings
from app.db import SessionLocal
from app.main import app
from app.models.build import Build
from app.pob.decode import encode_pob_code

SAMPLE_POB_XML = """<?xml version="1.0" encoding="UTF-8"?>
<PathOfBuilding>
    <Build level="93" className="Witch" ascendClassName="Necromancer">
        <PlayerStat stat="TotalDPS" value="543210.5"/>
        <PlayerStat stat="Life" value="4500"/>
        <PlayerStat stat="TotalEHP" value="30000"/>
    </Build>
    <Skills activeSkillSet="1">
        <SkillSet id="1">
            <Skill label="" enabled="true">
                <Gem nameSpec="Summon Raging Spirit" enabled="true"/>
            </Skill>
        </SkillSet>
    </Skills>
</PathOfBuilding>
"""

client = TestClient(app)
ADMIN_AUTH = (settings.admin_username, settings.admin_password)


def _payload(**overrides) -> dict:
    payload = {
        "title": "SRS Necromancer League Starter",
        "source_url": "https://example.com/build-1",
        "author": "SomeAuthor",
        "submitted_by": "someone@example.com",
        "game": "poe1",
        "class": "Witch",
        "ascendancy": "Necromancer",
        "main_skill": "Summon Raging Spirit",
        "league_patch": "3.29",
        "tags": ["League Starter", "Budget"],
        "pob_link": "https://pobb.in/abc123",
        "website": "",
    }
    payload.update(overrides)
    return payload


def _get_build(source_url: str) -> Build | None:
    db = SessionLocal()
    try:
        return db.scalar(select(Build).where(Build.source_url == source_url))
    finally:
        db.close()


def test_submit_creates_pending_community_build():
    response = client.post("/api/builds/submit", json=_payload())
    assert response.status_code == 201
    assert response.json() == {"status": "pending_review"}

    build = _get_build("https://example.com/build-1")
    assert build is not None
    assert build.source == "community"
    assert build.moderation_status == "pending"
    assert build.class_ == "Witch"
    assert build.ascendancy == "Necromancer"
    assert build.tags == ["League Starter", "Budget"]


def test_honeypot_field_silently_ignored():
    response = client.post(
        "/api/builds/submit",
        json=_payload(source_url="https://example.com/spam-1", website="http://spam.example"),
    )
    assert response.status_code == 201  # tváří se jako úspěch, aby to bot nepoznal
    assert _get_build("https://example.com/spam-1") is None


def test_duplicate_source_url_is_rejected():
    client.post("/api/builds/submit", json=_payload(source_url="https://example.com/dup"))
    response = client.post("/api/builds/submit", json=_payload(source_url="https://example.com/dup"))
    assert response.status_code == 409


def test_invalid_game_is_rejected():
    response = client.post("/api/builds/submit", json=_payload(game="poe3"))
    assert response.status_code == 422


def test_submit_with_pob_code_overrides_fields_and_sets_stats():
    code = encode_pob_code(SAMPLE_POB_XML)
    response = client.post(
        "/api/builds/submit",
        json=_payload(
            **{
                "source_url": "https://example.com/pob-build",
                # záměrně špatné/nekonzistentní ruční hodnoty — PoB kód by je měl přebít
                "class": "Ranger",
                "ascendancy": "Deadeye",
                "main_skill": "Lightning Arrow",
                "pob_code": code,
            }
        ),
    )
    assert response.status_code == 201

    build = _get_build("https://example.com/pob-build")
    assert build.class_ == "Witch"
    assert build.ascendancy == "Necromancer"
    assert build.main_skill == "Summon Raging Spirit"
    assert build.stats_dps == 543210.5
    assert build.stats_life == 4500
    assert build.stats_ehp == 30000


def test_submit_with_invalid_pob_code_falls_back_to_manual_fields():
    response = client.post(
        "/api/builds/submit",
        json=_payload(source_url="https://example.com/bad-pob", pob_code="not-a-valid-code!!!"),
    )
    assert response.status_code == 201

    build = _get_build("https://example.com/bad-pob")
    assert build.class_ == "Witch"  # z _payload(), ne z (neplatného) PoB kódu
    assert build.stats_dps is None


def test_rate_limit_blocks_after_threshold():
    original_limit = settings.submission_rate_limit_per_hour
    settings.submission_rate_limit_per_hour = 2
    try:
        for i in range(2):
            r = client.post(
                "/api/builds/submit", json=_payload(source_url=f"https://example.com/rl-{i}")
            )
            assert r.status_code == 201

        blocked = client.post(
            "/api/builds/submit", json=_payload(source_url="https://example.com/rl-blocked")
        )
        assert blocked.status_code == 429
    finally:
        settings.submission_rate_limit_per_hour = original_limit


def test_admin_endpoints_require_auth():
    response = client.get("/api/admin/builds/pending")
    assert response.status_code == 401


def test_admin_can_list_and_approve_pending_build():
    client.post("/api/builds/submit", json=_payload(source_url="https://example.com/approve-me"))

    pending = client.get("/api/admin/builds/pending", auth=ADMIN_AUTH)
    assert pending.status_code == 200
    matches = [b for b in pending.json() if b["source_url"] == "https://example.com/approve-me"]
    assert len(matches) == 1
    assert matches[0]["class"] == "Witch"
    build_id = matches[0]["id"]

    approved = client.post(f"/api/admin/builds/{build_id}/approve", auth=ADMIN_AUTH)
    assert approved.status_code == 200
    assert approved.json() == {"status": "approved"}

    pending_after = client.get("/api/admin/builds/pending", auth=ADMIN_AUTH)
    assert all(b["id"] != build_id for b in pending_after.json())

    build = _get_build("https://example.com/approve-me")
    assert build.moderation_status == "approved"
    assert build.moderated_at is not None


def test_admin_can_reject_with_note():
    client.post("/api/builds/submit", json=_payload(source_url="https://example.com/reject-me"))
    build = _get_build("https://example.com/reject-me")

    rejected = client.post(
        f"/api/admin/builds/{build.id}/reject",
        json={"note": "Odkaz nefunguje"},
        auth=ADMIN_AUTH,
    )
    assert rejected.status_code == 200
    assert rejected.json() == {"status": "rejected"}

    db = SessionLocal()
    try:
        refreshed = db.get(Build, build.id)
        assert refreshed.moderation_status == "rejected"
        assert refreshed.moderation_note == "Odkaz nefunguje"
    finally:
        db.close()


def test_admin_approve_unknown_id_returns_404():
    response = client.post(
        "/api/admin/builds/00000000-0000-0000-0000-000000000000/approve",
        auth=ADMIN_AUTH,
    )
    assert response.status_code == 404
