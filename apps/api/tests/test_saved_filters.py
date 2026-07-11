from fastapi.testclient import TestClient

from app.db import SessionLocal
from app.main import app
from app.models.build import Build

client = TestClient(app)


def _make_build(**overrides) -> Build:
    defaults = dict(
        title="Test Build",
        source="reddit",
        source_url=f"https://example.com/sf-{overrides.get('title', 'x')}-{id(overrides)}",
        moderation_status="approved",
        game="poe1",
        class_="Witch",
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


def _register(email: str) -> str:
    response = client.post("/api/auth/register", json={"email": email, "password": "supersecret"})
    return response.json()["access_token"]


def _auth(token: str) -> dict:
    return {"Authorization": f"Bearer {token}"}


def test_saved_filters_require_auth():
    assert client.get("/api/saved-filters").status_code == 401
    assert client.post("/api/saved-filters", json={"name": "x"}).status_code == 401


def test_create_and_list_saved_filter():
    token = _register("sf1@example.com")
    response = client.post(
        "/api/saved-filters",
        json={"name": "Witch builds", "game": "poe1", "class": "Witch"},
        headers=_auth(token),
    )
    assert response.status_code == 201
    body = response.json()
    assert body["name"] == "Witch builds"
    assert body["filter_params"] == {"game": "poe1", "class": "Witch", "tags": []}
    assert body["new_matches_count"] == 0  # žádné buildy ještě neexistovaly v době vytvoření

    list_response = client.get("/api/saved-filters", headers=_auth(token))
    assert len(list_response.json()) == 1


def test_new_matches_count_reflects_builds_indexed_after_creation():
    token = _register("sf2@example.com")
    create_response = client.post(
        "/api/saved-filters",
        json={"name": "Witch builds", "game": "poe1", "class": "Witch"},
        headers=_auth(token),
    )
    filter_id = create_response.json()["id"]

    # build nesplňující filtr (jiná class) se nepočítá
    _make_build(title="other-class", class_="Ranger")
    # build splňující filtr — přibude PO vytvoření uloženého filtru
    _make_build(title="matching", class_="Witch")

    list_response = client.get("/api/saved-filters", headers=_auth(token))
    assert list_response.json()[0]["new_matches_count"] == 1


def test_mark_seen_resets_new_matches_count():
    token = _register("sf3@example.com")
    create_response = client.post(
        "/api/saved-filters", json={"name": "All poe1", "game": "poe1"}, headers=_auth(token)
    )
    filter_id = create_response.json()["id"]

    _make_build(title="fresh")
    assert client.get("/api/saved-filters", headers=_auth(token)).json()[0]["new_matches_count"] == 1

    mark_response = client.post(f"/api/saved-filters/{filter_id}/mark-seen", headers=_auth(token))
    assert mark_response.status_code == 200
    assert mark_response.json()["new_matches_count"] == 0

    assert client.get("/api/saved-filters", headers=_auth(token)).json()[0]["new_matches_count"] == 0


def test_delete_saved_filter():
    token = _register("sf4@example.com")
    create_response = client.post(
        "/api/saved-filters", json={"name": "temp"}, headers=_auth(token)
    )
    filter_id = create_response.json()["id"]

    delete_response = client.delete(f"/api/saved-filters/{filter_id}", headers=_auth(token))
    assert delete_response.status_code == 204
    assert client.get("/api/saved-filters", headers=_auth(token)).json() == []


def test_saved_filters_are_scoped_per_user():
    token1 = _register("sf5a@example.com")
    token2 = _register("sf5b@example.com")
    create_response = client.post(
        "/api/saved-filters", json={"name": "mine"}, headers=_auth(token1)
    )
    filter_id = create_response.json()["id"]

    assert client.get("/api/saved-filters", headers=_auth(token2)).json() == []
    assert client.delete(f"/api/saved-filters/{filter_id}", headers=_auth(token2)).status_code == 404
