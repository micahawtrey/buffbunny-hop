from queries.routines import RoutineQueries
from fastapi.testclient import TestClient
from main import app
from authenticator import authenticator

client = TestClient(app=app)

def fake_get_current_account_data():
    return {"id": "FAKE_ACCOUNT_ID"}

class FakeRoutineQueries:
    def create_routine(self, routine_in, account_id):
        routine = routine_in.dict()
        routine["account_id"] = account_id
        routine["id"] = "FAKE_ID"
        return routine

def test_create_routine():
    # Arrange
    app.dependency_overrides[RoutineQueries] = FakeRoutineQueries
    app.dependency_overrides[authenticator.get_current_account_data] = (
        fake_get_current_account_data
    )
    # Act
    routine_in = {
        "name": "1",
        "description": "1",
        "workouts": [
            {
                "name": "1",
                "exercises": [
                    {
                    "name": "1",
                    "muscle_group": "1",
                    "set": "1",
                    "rep": "1"
                    }
                ],
                "id": "1"
            }
        ]
    }
    res = client.post("/api/routines", json=routine_in)
    #Assert
    assert res.status_code == 200
    assert res.json() == {
            "name": "1",
            "description": "1",
            "workouts": [
                {
                    "name": "1",
                    "exercises": [
                        {
                        "name": "1",
                        "muscle_group": "1",
                        "set": "1",
                        "rep": "1"
                        }
                    ],
                    "id": "1"
                }
            ],
            "id": "FAKE_ID",
            "account_id": "FAKE_ACCOUNT_ID"
        }
