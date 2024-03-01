from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from typing import List, Union
from queries.routines import RoutineQueries
from models import RoutineIn, RoutineOut, WorkoutOut, Error
from authenticator import authenticator

router = APIRouter()
