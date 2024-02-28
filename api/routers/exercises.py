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
from models import ExerciseOut, ExerciseIn

router = APIRouter()

@router.get("/api/exercises", response_model=List[ExerciseOut])
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
