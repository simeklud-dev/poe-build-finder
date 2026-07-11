from fastapi.testclient import TestClient

from app.db import SessionLocal
from app.main import app
from app.models.build import Build

client = TestClient(app)


def _make_build(**overrides) -> Build:
    defaults = dict(
        title="Test Build",
        source="reddit",
        source_url=f"https://example.com/fav-{overrides.get('title', 'x')}-{id(overrides)}",
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


def _register(email: str) -> str:
    response = client.post("/api/auth/register", json={"email": email, "password": "supersecret"})
    return response.json()["access_token"]


def _auth(token: str) -> dict:
    return {"Authorization": f"Bearer {token}"}


def test_favorites_require_auth():
    build = _make_build(title="A", source_url="https://example.com/fav-a")
    assert client.get("/api/favorites").status_code == 401
    assert client.post(f"/api/favorites/{build.id}").status_code == 401


def test_add_list_and_remove_favorite():
    token = _register("fav1@example.com")
    build = _make_build(title="B", source_url="https://example.com/fav-b")

    add_response = client.post(f"/api/favorites/{build.id}", headers=_auth(token))
    assert add_response.status_code == 201
    assert add_response.json() == {"status": "favorited"}

    list_response = client.get("/api/favorites", headers=_auth(token))
    assert list_response.status_code == 200
    assert [b["id"] for b in list_response.json()] == [str(build.id)]

    remove_response = client.delete(f"/api/favorites/{build.id}", headers=_auth(token))
    assert remove_response.status_code == 204

    list_after = client.get("/api/favorites", headers=_auth(token))
    assert list_after.json() == []


def test_favoriting_twice_is_idempotent():
    token = _register("fav2@example.com")
    build = _make_build(title="C", source_url="https://example.com/fav-c")

    client.post(f"/api/favorites/{build.id}", headers=_auth(token))
    second = client.post(f"/api/favorites/{build.id}", headers=_auth(token))
    assert second.status_code == 201
    assert second.json() == {"status": "already_favorited"}

    list_response = client.get("/api/favorites", headers=_auth(token))
    assert len(list_response.json()) == 1


def test_favorite_unknown_build_returns_404():
    token = _register("fav3@example.com")
    response = client.post(
        "/api/favorites/00000000-0000-0000-0000-000000000000", headers=_auth(token)
    )
    assert response.status_code == 404


def test_favorites_are_scoped_per_user():
    token1 = _register("fav4a@example.com")
    token2 = _register("fav4b@example.com")
    build = _make_build(title="D", source_url="https://example.com/fav-d")

    client.post(f"/api/favorites/{build.id}", headers=_auth(token1))

    assert len(client.get("/api/favorites", headers=_auth(token1)).json()) == 1
    assert len(client.get("/api/favorites", headers=_auth(token2)).json()) == 0
