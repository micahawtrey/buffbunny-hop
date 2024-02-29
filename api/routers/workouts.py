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

router = APIRouter()


@router.get("/api/workouts/{id}", response_model=Union[WorkoutOut, Error])
def get_workout(
    id,
    repo: WorkoutQueries = Depends()
):
    workout = repo.get(id)
    return workout

@router.post("/api/workouts", response_model=WorkoutOut)
def create_workout(
    info: WorkoutIn,
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
