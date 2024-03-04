from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from typing import List, Union
from queries.workouts import WorkoutQueries
from models import ExerciseOut, WorkoutIn, WorkoutOut, Error, Deleted
from authenticator import authenticator

router = APIRouter()

@router.get("/api/workouts", response_model=Union[List[WorkoutOut], Error])
def get_all_workouts(
    account_id: dict = Depends(authenticator.get_current_account_data),
    repo: WorkoutQueries = Depends()
):
    try:
        workout_list = repo.get_all_workouts()
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
            )
    return workout_list

@router.get("/api/workouts/{workout_id}", response_model=Union[WorkoutOut, Error])
def get_workout(
    workout_id,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: WorkoutQueries = Depends()
):
    try:
        workout = repo.get_one_workout(workout_id)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    return workout

@router.post("/api/workouts", response_model=WorkoutOut)
def create_workout(
    info: WorkoutIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: WorkoutQueries = Depends()
):
    try:
        workout = repo.create_workout(info, account_data["id"])
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    return workout

@router.put("/api/workouts/{workout_id}", response_model=Union[WorkoutOut, Error])
def update_workout(
    workout_id,
    info: WorkoutIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: WorkoutQueries = Depends()
):
    try:
        updated_workout = repo.update_workout(workout_id, info, account_data["id"])
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    return updated_workout

@router.delete("/api/workout/{workout_id}", response_model=Deleted)
def delete_workout(
    workout_id: str,
    account_id: dict = Depends(authenticator.get_current_account_data),
    repo: WorkoutQueries = Depends()
):
    try:
        deletion = repo.delete_workout(workout_id=workout_id, account_id=account_id["id"])
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    return deletion
