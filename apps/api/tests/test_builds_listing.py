from datetime import datetime, timedelta, timezone

from fastapi.testclient import TestClient

from app.db import SessionLocal
from app.main import app
from app.models.build import Build

client = TestClient(app)

NOW = datetime(2026, 1, 1, tzinfo=timezone.utc)


def _make_build(**overrides) -> Build:
    defaults = dict(
        title="Default Build",
        source="reddit",
        source_url=f"https://example.com/{overrides.get('title', 'default')}-{id(overrides)}",
        author="Someone",
        moderation_status="approved",
        game="poe1",
        class_="Witch",
        ascendancy="Necromancer",
        main_skill="Summon Raging Spirit",
        league_patch="3.29",
        tags=["League Starter"],
        popularity_score=10,
        published_at=NOW,
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


def test_list_only_returns_approved_builds():
    _make_build(title="Pending", source_url="https://example.com/pending", moderation_status="pending")
    _make_build(title="Rejected", source_url="https://example.com/rejected", moderation_status="rejected")
    approved = _make_build(title="Approved", source_url="https://example.com/approved")

    response = client.get("/api/builds")
    assert response.status_code == 200
    body = response.json()
    assert body["total"] == 1
    assert [item["id"] for item in body["items"]] == [str(approved.id)]


def test_filter_by_game():
    _make_build(title="PoE1 build", source_url="https://example.com/poe1", game="poe1")
    _make_build(title="PoE2 build", source_url="https://example.com/poe2", game="poe2")

    response = client.get("/api/builds", params={"game": "poe2"})
    body = response.json()
    assert body["total"] == 1
    assert body["items"][0]["game"] == "poe2"


def test_filter_by_class_is_case_insensitive():
    _make_build(title="Witch build", source_url="https://example.com/witch", class_="Witch")
    _make_build(title="Ranger build", source_url="https://example.com/ranger", class_="Ranger")

    response = client.get("/api/builds", params={"class": "witch"})
    body = response.json()
    assert body["total"] == 1
    assert body["items"][0]["class"] == "Witch"


def test_filter_by_tags_overlap():
    _make_build(title="Starter", source_url="https://example.com/starter", tags=["League Starter"])
    _make_build(title="Bossing", source_url="https://example.com/bossing", tags=["Bossing"])
    _make_build(title="Both", source_url="https://example.com/both", tags=["League Starter", "Bossing"])

    response = client.get("/api/builds", params={"tags": ["Bossing"]})
    body = response.json()
    titles = {item["title"] for item in body["items"]}
    assert titles == {"Bossing", "Both"}


def test_fulltext_search():
    _make_build(
        title="Summon Raging Spirit Necromancer",
        source_url="https://example.com/srs",
        description="Powerful minion build",
    )
    _make_build(title="Cyclone Slayer", source_url="https://example.com/cyclone")

    response = client.get("/api/builds", params={"q": "necromancer"})
    body = response.json()
    assert body["total"] == 1
    assert body["items"][0]["title"] == "Summon Raging Spirit Necromancer"


def test_whitespace_only_q_is_ignored():
    _make_build(title="Bossing build", source_url="https://example.com/bossing-ws", tags=["Bossing"])

    response = client.get("/api/builds", params={"q": "  ", "tags": ["Bossing"]})
    body = response.json()
    assert body["total"] == 1


def test_sort_by_popularity():
    _make_build(title="Low", source_url="https://example.com/low", popularity_score=1)
    _make_build(title="High", source_url="https://example.com/high", popularity_score=100)

    response = client.get("/api/builds", params={"sort": "popularity"})
    body = response.json()
    assert [item["title"] for item in body["items"]] == ["High", "Low"]


def test_sort_by_date_defaults_newest_first():
    _make_build(title="Older", source_url="https://example.com/older", published_at=NOW - timedelta(days=5))
    _make_build(title="Newer", source_url="https://example.com/newer", published_at=NOW)

    response = client.get("/api/builds")
    body = response.json()
    assert [item["title"] for item in body["items"]] == ["Newer", "Older"]


def test_pagination():
    for i in range(5):
        _make_build(
            title=f"Build {i}",
            source_url=f"https://example.com/page-{i}",
            published_at=NOW - timedelta(days=i),
        )

    response = client.get("/api/builds", params={"page": 1, "page_size": 2})
    body = response.json()
    assert body["total"] == 5
    assert len(body["items"]) == 2
    assert body["page"] == 1

    response2 = client.get("/api/builds", params={"page": 3, "page_size": 2})
    body2 = response2.json()
    assert len(body2["items"]) == 1
