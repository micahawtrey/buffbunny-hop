from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from typing import List
from queries.exercises import ExerciseQueries
from models import ExerciseOut

router = APIRouter()


@router.post("/api/workout", response_model=Exercise)
async def create_exercise(
    info: ExerciseIn,
    repo: ExerciseQueries = Depends()
):
    try:
        exercise = repo.create(info)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    return exercise
