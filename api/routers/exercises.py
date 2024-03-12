from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from authenticator import authenticator
from typing import List, Union
from queries.exercises import ExerciseQueries
from models import ExerciseOut, ExerciseIn, Error, Deleted, ExerciseFilter

router = APIRouter()

@router.get('/api/exercises', response_model=Union[ExerciseFilter, Error])
async def filter_exercises(
    filter_criteria: ExerciseFilter,
    account_id: dict = Depends(authenticator.get_current_account_data),
    repo: ExerciseQueries = Depends()
):
    try:
        filtered_exercises = repo.filter_exercises(filter_criteria)

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
        
    return filtered_exercises

@router.get("/api/exercises/{exercise_id}", response_model=Union[ExerciseOut, Error])
def get_one_exercise(
    exercise_id: str,
    account_id: dict = Depends(authenticator.get_current_account_data),
    repo: ExerciseQueries = Depends()
):
    try:
        exercise = repo.get_one_exercise(exercise_id)
        if exercise is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Exercise not found"
            )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
            )
    return exercise

@router.post("/api/exercises", response_model=ExerciseOut)
def create_exercise(
    exercise_in: ExerciseIn,
    account_id: dict = Depends(authenticator.get_current_account_data),
    repo: ExerciseQueries = Depends()
):
    try:
        new_exercise = repo.create_exercise(exercise_in, account_id=account_id["id"])
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
            )
    return new_exercise

@router.put("/api/exercises/{exercise_id}", response_model=Union[ExerciseOut, Error])
def update_exercise(
    exercise_id: str,
    exercise_in: ExerciseIn,
    account_id: dict = Depends(authenticator.get_current_account_data),
    repo: ExerciseQueries = Depends()
):
    try:
        exercise = repo.update_exercise(exercise_id=exercise_id, account_id=account_id['id'], exercise_in=exercise_in)
    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail="Exercise not found" + str(e)
            )
    return exercise

@router.delete("/api/exercises/{exercise_id}", response_model=Deleted)
def delete_exercise(
    exercise_id: str,
    account_id: dict = Depends(authenticator.get_current_account_data),
    repo: ExerciseQueries = Depends()
):
    try:
        deletion = repo.delete_exercise(exercise_id=exercise_id, account_id=account_id["id"])
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Exercise not found" + str(e)
        )
    return deletion
