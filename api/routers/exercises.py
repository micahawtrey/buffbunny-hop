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
    account_id: dict = Depends(authenticator.get_current_account_data),
    repo: ExerciseQueries = Depends()
):
    exercises_list = repo.get_all_exercises()
    return exercises_list

@router.get("/api/exercises/{exercise_id}", response_model=ExerciseOut)
def get_one_exercise(
    exercise_id: str,
    account_id: dict = Depends(authenticator.get_current_account_data),
    repo: ExerciseQueries = Depends()
):
    exercise = repo.get_one_exercise(exercise_id, account_id=account_id["id"])
    if exercise is None:
        raise HTTPException(status_code=status.HTTP_418_IM_A_TEAPOT,
                            detail="Exercise not found"
        )
    return exercise

@router.post("/api/exercises", response_model=ExerciseOut)
def create_exercise(
    exercise_in: ExerciseIn,
    account_id: dict = Depends(authenticator.get_current_account_data),
    repo: ExerciseQueries = Depends()
):
    new_exercise = repo.create_exercise(exercise_in, account_id=account_id["id"])
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

@router.delete("/api/exercises/{exercise_id}", response_model=Deleted)
def delete_exercise(
    exercise_id: str,
    account_id: dict = Depends(authenticator.get_current_account_data),
    repo: ExerciseQueries = Depends()
):
    deletion = repo.delete_exercise(exercise_id=exercise_id, account_id=account_id["id"])
    return deletion
