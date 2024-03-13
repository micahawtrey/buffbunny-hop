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



# @router.get('/api/exercises_api/{name}', response_model=ExerciseApiOut)
# def details_exercise_api(name: str):
#     print(f"Searching for exercise: {name}")
#     exercise_data = queries.get_exercise_details_api(name)
#     print(f"Exercise data: {exercise_data}")
#     if exercise_data:
#         return ExerciseApiOut(name=exercise_data['name'], target=exercise_data['target'])
#     else:
#         raise HTTPException(status_code=404, detail="Exercise not found")

@router.get('/api/exercises_api/{name}', response_model=ExerciseApiOut)
def details_exercise_api(name: str):
    print(f"Searching for exercise: {name}")
    exercise_data = queries.get_exercise_details_api(name)
    print(f"Exercise data: {exercise_data}")
    if exercise_data and 'exercise' in exercise_data:
        # Extract names of all exercises
        exercise_names = [exercise['name'] for exercise in exercise_data['exercise']]
        # Return the list of exercise names
        return {"exercise_names": exercise_names}
    else:
        raise HTTPException(status_code=404, detail="Exercise not found")
git
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
