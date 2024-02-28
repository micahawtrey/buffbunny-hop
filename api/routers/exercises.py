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

@router.get("/api/exercises", response_model=List[ExerciseOut])
def get_all_exercises(
    repo: ExerciseQueries = Depends()
):
    exercises_list = repo.get_all_exercises()
    return exercises_list
