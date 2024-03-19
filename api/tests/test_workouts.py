

from fastapi.testclient import TestClient
from queries.workouts import WorkoutQueries
from authenticator import authenticator
from main import app

client = TestClient(app=app)

def fake_get_current_account_data():
    return {"id": "FAKE_ACCOUNT_ID"}

class FakeWorkoutQueries:
    def create_workout(self, workout_in, account_id):
        workout = workout_in.dict()
        workout["account_id"] = account_id
        workout["id"] = "FAKE_ID"
        return workout

def test_create_workout():
    app.dependency_overrides[WorkoutQueries] = FakeWorkoutQueries
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data

    workout_in = {
        "name": "Workout A",
        "exercises": [
            {
                "name": "Exercise 1",
                "muscle_group": "Group 1",
                "set": "string",
                "rep": "string"
            }
        ],
        "id": "string"
    }
    res = client.post("/api/workouts", json=workout_in)

    # Assert
    assert res.status_code == 200
    assert res.json() == {
        "name": "Workout A",
        "exercises": [
            {
                "name": "Exercise 1",
                "muscle_group": "Group 1",
                "set": "string",
                "rep": "string"
            }
        ],
        "id": "FAKE_ID",
    }
