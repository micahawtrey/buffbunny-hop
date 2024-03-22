from fastapi.testclient import TestClient
from main import app

client = TestClient(app=app)


def test_create_account():
    account_in = {
        "full_name": "test_name",
        "username": "username",
        "email": "email@example.com",
        "password": "password"
    }

    response = client.post("/api/accounts", json=account_in)

    if response.status_code == 200:
        assert "access_token" in response.json()
    else:
        print(response.status_code)
        print(response.json())


def test_duplicate_account():
    account_data = {
        "full_name": "test_name",
        "username": "existing_username",
        "email": "email@example.com",
        "password": "password"
    }

    response = client.post("/api/accounts", json=account_data)

    response = client.post("/api/accounts", json=account_data)

    assert response.status_code == 400
