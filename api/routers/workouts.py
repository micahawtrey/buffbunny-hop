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
from models import ExerciseOut, WorkoutIn, WorkoutOut, Error
from authenticator import authenticator

router = APIRouter()


@router.get("/api/workouts/{workout_id}", response_model=Union[WorkoutOut, Error])
def get_workout(
    workout_id,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: WorkoutQueries = Depends()
):
    workout = repo.get(workout_id)
    return workout

@router.post("/api/workouts", response_model=WorkoutOut)
def create_workout(
    info: WorkoutIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: WorkoutQueries = Depends()
):
    try:
        workout = repo.create(info)
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
    updated_workout = repo.update(workout_id, info)
    return updated_workout
