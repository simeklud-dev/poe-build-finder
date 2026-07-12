"""CRUD pro admin-spravované odkazy na buildy z Maxroll/PoE Vault/Mobalytics
(app/routers/admin.py) — jen metadata + odkaz, nikdy obsah stránky."""

from fastapi.testclient import TestClient

from app.config import settings
from app.db import SessionLocal
from app.main import app
from app.models.build import Build

client = TestClient(app)
ADMIN_AUTH = (settings.admin_username, settings.admin_password)

VALID_PAYLOAD = {
    "title": "Cold DoT Occultist",
    "source_site": "poevault",
    "url": "https://poe-vault.com/builds/cold-dot-occultist",
    "game": "poe1",
    "class_tag": "Witch",
    "build_type": "endgame boss killer",
    "league_version": "3.29",
    "short_note": "Solid uber killer, budget friendly",
    "author": "PoE Vault Team",
    "tags": ["Bossing"],
}


def test_endpoints_require_admin_auth():
    assert client.get("/api/admin/builds").status_code == 401
    assert client.post("/api/admin/builds", json=VALID_PAYLOAD).status_code == 401


def test_create_rejects_non_external_source():
    payload = {**VALID_PAYLOAD, "source_site": "reddit"}
    response = client.post("/api/admin/builds", json=payload, auth=ADMIN_AUTH)
    assert response.status_code == 422


def test_create_list_get_update_delete_roundtrip():
    create_resp = client.post("/api/admin/builds", json=VALID_PAYLOAD, auth=ADMIN_AUTH)
    assert create_resp.status_code == 201
    created = create_resp.json()
    assert created["source_site"] == "poevault"
    assert created["url"] == VALID_PAYLOAD["url"]
    assert created["class_tag"] == "Witch"
    assert created["build_type"] == "endgame boss killer"
    assert created["league_version"] == "3.29"
    assert created["short_note"] == VALID_PAYLOAD["short_note"]
    assert created["link_status"] == "unchecked"
    build_id = created["id"]

    # Rovnou approved a viditelný ve veřejném výpisu
    public = client.get("/api/builds", params={"source": "poevault"})
    assert any(b["id"] == build_id for b in public.json()["items"])

    # Admin list + filtr dle class_tag / source_site
    listed = client.get(
        "/api/admin/builds", params={"class_tag": "Witch"}, auth=ADMIN_AUTH
    )
    assert listed.status_code == 200
    assert any(b["id"] == build_id for b in listed.json()["items"])

    filtered_out = client.get(
        "/api/admin/builds", params={"source_site": "maxroll"}, auth=ADMIN_AUTH
    )
    assert all(b["id"] != build_id for b in filtered_out.json()["items"])

    # Detail
    detail = client.get(f"/api/admin/builds/{build_id}", auth=ADMIN_AUTH)
    assert detail.status_code == 200
    assert detail.json()["title"] == "Cold DoT Occultist"

    # Update (partial)
    update = client.put(
        f"/api/admin/builds/{build_id}",
        json={"short_note": "Updated note", "build_type": "league starter"},
        auth=ADMIN_AUTH,
    )
    assert update.status_code == 200
    assert update.json()["short_note"] == "Updated note"
    assert update.json()["build_type"] == "league starter"
    assert update.json()["class_tag"] == "Witch"  # nezměněná pole zůstávají

    # Delete
    delete = client.delete(f"/api/admin/builds/{build_id}", auth=ADMIN_AUTH)
    assert delete.status_code == 204
    assert client.get(f"/api/admin/builds/{build_id}", auth=ADMIN_AUTH).status_code == 404


def test_pending_route_not_shadowed_by_build_id_route():
    """Regresní test na pořadí route: /pending (statická cesta) se nesmí schovat
    za /{build_id} (catch-all) — jinak by GET /pending skončil 422 (neplatné UUID)
    místo správného chování."""
    response = client.get("/api/admin/builds/pending", auth=ADMIN_AUTH)
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_update_and_delete_reject_non_external_build():
    db = SessionLocal()
    try:
        reddit_build = Build(
            title="Reddit build",
            source="reddit",
            source_url="https://reddit.com/r/pathofexile/comments/xyz",
            moderation_status="approved",
            game="poe1",
            tags=[],
        )
        db.add(reddit_build)
        db.commit()
        db.refresh(reddit_build)
        build_id = str(reddit_build.id)
    finally:
        db.close()

    update = client.put(
        f"/api/admin/builds/{build_id}", json={"title": "hijacked"}, auth=ADMIN_AUTH
    )
    assert update.status_code == 404

    delete = client.delete(f"/api/admin/builds/{build_id}", auth=ADMIN_AUTH)
    assert delete.status_code == 404


def test_duplicate_source_and_url_conflicts():
    first = client.post("/api/admin/builds", json=VALID_PAYLOAD, auth=ADMIN_AUTH)
    assert first.status_code == 201

    duplicate = client.post("/api/admin/builds", json=VALID_PAYLOAD, auth=ADMIN_AUTH)
    assert duplicate.status_code == 409
