"""Build s link_status='broken' se nesmí objevit ve veřejném GET /api/builds
(app/build_filters.py) — check_links.py cron ho tak označí, když odkaz přestane
fungovat, a nechceme uživatele posílat na mrtvý odkaz."""

from fastapi.testclient import TestClient

from app.db import SessionLocal
from app.main import app
from app.models.build import Build

client = TestClient(app)


def _make_build(**overrides) -> Build:
    defaults = dict(
        title="Broken link test build",
        source="poevault",
        source_url=f"https://poe-vault.com/x-{overrides.get('link_status', 'x')}-{id(overrides)}",
        moderation_status="approved",
        game="poe1",
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


def test_broken_link_hidden_from_public_search():
    ok_build = _make_build(title="OK build", link_status="ok")
    unchecked_build = _make_build(title="Unchecked build", link_status="unchecked")
    broken_build = _make_build(title="Broken build", link_status="broken")

    response = client.get("/api/builds", params={"q": "build"})
    ids = {b["id"] for b in response.json()["items"]}

    assert str(ok_build.id) in ids
    assert str(unchecked_build.id) in ids
    assert str(broken_build.id) not in ids
