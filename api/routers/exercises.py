from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from authenticator import authenticator
from typing import List
from typing import List, Union
from queries.exercises import ExerciseQueries
from models import ExerciseOut, ExerciseIn, Error, Deleted

router = APIRouter()

@router.get("/api/exercises", response_model=Union[List[ExerciseOut], Error])
def get_all_exercises(
    repo: ExerciseQueries = Depends()
):
    exercises_list = repo.get_all_exercises()
    return exercises_list

@router.post("/api/exercises", response_model=ExerciseOut)
def create_exercise(
    exercise_in: ExerciseIn,
    repo: ExerciseQueries = Depends()
):
    new_exercise = repo.create_exercise(exercise_in)
    return new_exercise

@router.put("/api/exercises/{exercise_id}", response_model=ExerciseOut)
def update_exercise(
    exercise_id: str,
    exercise_in: ExerciseIn,
    account_id: dict = Depends(authenticator.get_current_account_data),
    queries: ExerciseQueries = Depends()
):
    exercise = queries.update(exercise_id=exercise_id, account_id=account_id['id'], exercise_in=exercise_in)
    if exercise is None:
        raise HTTPException(status_code=404, detail="Exercise not found")
    return exercise

@router.delete("/api/exercises/{exercise_name}", response_model=Deleted)
def delete_exercise(
    exercise_name,
    repo: ExerciseQueries = Depends()
):
    return repo.delete_exercise(exercise_name=exercise_name)
