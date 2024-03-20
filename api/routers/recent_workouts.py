from fastapi import (
    Depends,
    HTTPException,
    status,
    APIRouter,
)
from typing import List, Union
from queries.recent_workouts import RecentWorkoutQueries
from models import RecentWorkoutIn, RecentWorkoutOut, Error
from authenticator import authenticator

router = APIRouter()


@router.post(
    "/api/recent_workouts",
    response_model=Union[RecentWorkoutOut, Error])
def create_recent_workout(
    info: RecentWorkoutIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: RecentWorkoutQueries = Depends()
):
    try:
        recent_workout = repo.create_recent_workout(info, account_data["id"])
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    return recent_workout


@router.get(
    "/api/recent_workouts",
    response_model=Union[List[RecentWorkoutOut], Error])
def filter_recent_workouts(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: RecentWorkoutQueries = Depends()
):
    try:
        recent_workouts = repo.filter_recent_workouts(account_data["id"])
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    return recent_workouts
