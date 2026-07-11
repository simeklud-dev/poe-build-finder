from fastapi.testclient import TestClient
from sqlalchemy import select

from app.config import settings
from app.db import SessionLocal
from app.main import app
from app.models.build import Build

client = TestClient(app)
ADMIN_AUTH = (settings.admin_username, settings.admin_password)


def _make_build(**overrides) -> Build:
    defaults = dict(
        title="Test Build",
        source="reddit",
        source_url=f"https://example.com/report-{overrides.get('title', 'x')}-{id(overrides)}",
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


def test_admin_reports_require_auth():
    assert client.get("/api/admin/reports").status_code == 401


def test_list_open_reports():
    build = _make_build(title="reported1")
    client.post(f"/api/builds/{build.id}/report", json={"reason": "spam link"})

    response = client.get("/api/admin/reports", auth=ADMIN_AUTH)
    assert response.status_code == 200
    reports = response.json()
    assert len(reports) == 1
    assert reports[0]["build_id"] == str(build.id)
    assert reports[0]["reason"] == "spam link"
    assert reports[0]["status"] == "open"


def test_dismiss_report_leaves_build_approved():
    build = _make_build(title="reported2")
    client.post(f"/api/builds/{build.id}/report", json={"reason": "not spam actually"})
    report_id = client.get("/api/admin/reports", auth=ADMIN_AUTH).json()[0]["id"]

    response = client.post(f"/api/admin/reports/{report_id}/dismiss", auth=ADMIN_AUTH)
    assert response.status_code == 200
    assert response.json() == {"status": "dismissed"}

    assert client.get("/api/admin/reports", auth=ADMIN_AUTH).json() == []

    db = SessionLocal()
    try:
        refreshed = db.get(Build, build.id)
        assert refreshed.moderation_status == "approved"
    finally:
        db.close()


def test_remove_build_sets_rejected():
    build = _make_build(title="reported3")
    client.post(f"/api/builds/{build.id}/report", json={"reason": "actual spam"})
    report_id = client.get("/api/admin/reports", auth=ADMIN_AUTH).json()[0]["id"]

    response = client.post(f"/api/admin/reports/{report_id}/remove-build", auth=ADMIN_AUTH)
    assert response.status_code == 200
    assert response.json() == {"status": "resolved"}

    db = SessionLocal()
    try:
        refreshed = db.get(Build, build.id)
        assert refreshed.moderation_status == "rejected"
        assert refreshed.moderated_at is not None
    finally:
        db.close()

    # zmizí i z veřejného výpisu
    search = client.get("/api/builds", params={"q": "reported3"})
    assert all(b["id"] != str(build.id) for b in search.json()["items"])
