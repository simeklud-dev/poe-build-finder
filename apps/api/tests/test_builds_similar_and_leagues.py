from fastapi.testclient import TestClient

from app.db import SessionLocal
from app.main import app
from app.models.build import Build

client = TestClient(app)


def _make_build(**overrides) -> Build:
    defaults = dict(
        title="Test Build",
        source="reddit",
        source_url=f"https://example.com/sim-{overrides.get('title', 'x')}-{id(overrides)}",
        moderation_status="approved",
        game="poe1",
        class_="Witch",
        main_skill="Summon Raging Spirit",
        popularity_score=10,
        tags=[],
    )
    defaults.update(overrides)
    build = Build(**defaults)
    db = SessionLocal()
    try:
        db.add(build)
        db.commit()
        db.refresh(build)
        return build
    finally:
        db.close()


def test_similar_builds_matches_by_main_skill():
    target = _make_build(title="target", main_skill="Summon Raging Spirit", class_="Witch")
    match = _make_build(
        title="match", main_skill="Summon Raging Spirit", class_="Necromancer", popularity_score=999
    )
    _make_build(title="unrelated", main_skill="Cyclone", class_="Duelist")

    response = client.get(f"/api/builds/{target.id}/similar")
    assert response.status_code == 200
    ids = [b["id"] for b in response.json()]
    assert str(match.id) in ids
    assert len(ids) == 1


def test_similar_builds_excludes_self_and_different_game():
    target = _make_build(title="target2", main_skill="Cyclone", class_="Duelist")
    _make_build(title="other-game", main_skill="Cyclone", class_="Duelist", game="poe2")

    response = client.get(f"/api/builds/{target.id}/similar")
    assert response.json() == []


def test_similar_builds_unknown_id_returns_404():
    response = client.get("/api/builds/00000000-0000-0000-0000-000000000000/similar")
    assert response.status_code == 404


def test_list_leagues_returns_distinct_approved_league_patches():
    _make_build(title="a", league_patch="3.29")
    _make_build(title="b", league_patch="3.29")
    _make_build(title="c", league_patch="3.28")
    _make_build(title="d", league_patch=None)
    _make_build(title="pending", league_patch="0.9", moderation_status="pending")

    response = client.get("/api/builds/leagues")
    assert response.status_code == 200
    assert set(response.json()) == {"3.29", "3.28"}


def test_report_build_creates_open_report():
    build = _make_build(title="reportme")
    response = client.post(f"/api/builds/{build.id}/report", json={"reason": "This is spam"})
    assert response.status_code == 201
    assert response.json() == {"status": "reported"}


def test_report_unknown_build_returns_404():
    response = client.post(
        "/api/builds/00000000-0000-0000-0000-000000000000/report", json={"reason": "x"}
    )
    assert response.status_code == 404
