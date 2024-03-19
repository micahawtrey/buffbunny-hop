from fastapi.testclient import TestClient
from queries.exercises import ExerciseQueries
from authenticator import authenticator
from main import app


client = TestClient(app=app)

def fake_get_current_account_data():
    return{
        "id": "FAKE_ACCOUNT_ID"
    }

class FakeExerciseQueries:
    def create_exercise(self, exercise_in, account_id):
        exercise = exercise_in.dict()
        exercise['account_id'] = account_id
        exercise['id'] = 'FAKE_ID'
        return exercise



def test_create_exercise():
    #Arrange
    app.dependency_overrides[ExerciseQueries] = FakeExerciseQueries
    app.dependency_overrides[authenticator.get_current_account_data] = (
        fake_get_current_account_data

     )

    #Act
    exercise_in = {
        "name": "bech",
        "muscle_group": "chest",
    }
    res = client.post('/api/exercises', json=exercise_in)

    #Assert
    assert res.status_code == 200
    assert res.json() == {
        "name": "bech",
        "muscle_group": "chest",
        "id": "FAKE_ID",
    }
