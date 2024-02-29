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
from models import ExerciseOut, ExerciseIn, Error, Deleted

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

@router.delete("/api/exercises/{exercise_name}", response_model=Deleted)
def delete_exercise(
    exercise_name,
    repo: ExerciseQueries = Depends()
):
    return repo.delete_exercise(exercise_name=exercise_name)
