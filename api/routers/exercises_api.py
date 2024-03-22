from fastapi import APIRouter, Depends
from models import ExerciseApiOut, ExerciseApiList
from queries.exercises_api import ExerciseApiQueries
from typing import List

router = APIRouter()
queries = ExerciseApiQueries()


@router.get('/api/exercises_api', response_model=ExerciseApiList)
async def list_exercises_api(queries: ExerciseApiQueries = Depends()):
    exercises_data = queries.get_all_exercises_api()
    if exercises_data:
        exercises = [
            {
                "name": exercise.get("name", ""),
                "target": exercise.get("target", ""),
                "url": exercise.get("gifUrl", "")
            }

            for exercise in exercises_data
        ]
        return {"exercise": exercises}
    else:
        return {"exercise": []}


@router.get('/api/exercises_api/{name}', response_model=ExerciseApiOut)
def details_exercise_api(
    name: str,
    queries: ExerciseApiQueries = Depends()
):
    return queries.get_exercise_details_api(name=name)


@router.get(
    '/api/exercises_api/target/{target}',
    response_model=List[ExerciseApiOut])
def target_exercise_api(
    target: str,
    queries: ExerciseApiQueries = Depends()
):
    return queries.get_exercise_target_api(target=target)
