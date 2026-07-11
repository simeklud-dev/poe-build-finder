from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_register_creates_user_and_returns_token():
    response = client.post(
        "/api/auth/register", json={"email": "Player1@Example.com", "password": "supersecret"}
    )
    assert response.status_code == 201
    body = response.json()
    assert body["token_type"] == "bearer"
    assert body["access_token"]
    assert body["user"]["email"] == "player1@example.com"  # normalizováno na lowercase


def test_register_duplicate_email_rejected():
    client.post("/api/auth/register", json={"email": "dup@example.com", "password": "supersecret"})
    response = client.post("/api/auth/register", json={"email": "dup@example.com", "password": "different"})
    assert response.status_code == 409


def test_register_short_password_rejected():
    response = client.post("/api/auth/register", json={"email": "short@example.com", "password": "abc"})
    assert response.status_code == 422


def test_login_with_correct_credentials():
    client.post("/api/auth/register", json={"email": "login1@example.com", "password": "supersecret"})
    response = client.post("/api/auth/login", json={"email": "login1@example.com", "password": "supersecret"})
    assert response.status_code == 200
    assert response.json()["access_token"]


def test_login_with_wrong_password_rejected():
    client.post("/api/auth/register", json={"email": "login2@example.com", "password": "supersecret"})
    response = client.post("/api/auth/login", json={"email": "login2@example.com", "password": "wrongpass"})
    assert response.status_code == 401


def test_login_unknown_email_rejected():
    response = client.post("/api/auth/login", json={"email": "doesnotexist@example.com", "password": "whatever"})
    assert response.status_code == 401


def test_me_requires_token():
    response = client.get("/api/auth/me")
    assert response.status_code == 401


def test_me_returns_current_user_with_valid_token():
    register_response = client.post(
        "/api/auth/register", json={"email": "me1@example.com", "password": "supersecret"}
    )
    token = register_response.json()["access_token"]
    response = client.get("/api/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert response.json()["email"] == "me1@example.com"


def test_me_rejects_invalid_token():
    response = client.get("/api/auth/me", headers={"Authorization": "Bearer not-a-real-token"})
    assert response.status_code == 401
