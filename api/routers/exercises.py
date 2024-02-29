from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from typing import List, Union
from queries.exercises import ExerciseQueries
from models import ExerciseOut, ExerciseIn, Error

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
