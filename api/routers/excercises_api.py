from fastapi import APIRouter,Depends, HTTPException
from models import ExerciseApiOut, ExerciseApiList
from queries.exercises_api import ExerciseApiQueries

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
