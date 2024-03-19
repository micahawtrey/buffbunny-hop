from fastapi.testclient import TestClient
from queries.exercises import ExerciseQueries
from main import app


client = TestClient(app=app)


class FakeExerciseQueries:
    def filtered_exercises(self,name, muscle_group):
        exercise = exercise_in.dict()

        return []

def test_filter_exercises():
    #Arrange
    app.dependency_overrides[ExerciseQueries] = FakeExerciseQueries

    #Act
    exercise_in: {"name": "bench"}
    res = client.get('/api/exercises')

    #Assert
    assert res.status_code == 200
    assert res.json == 
