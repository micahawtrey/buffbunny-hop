from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from authenticator import authenticator
from typing import List, Union
from queries.routines import RoutineQueries
from models import RoutineOut, RoutineIn, Error, Deleted

router = APIRouter()

@router.get("/api/routines/{routine_id}", response_model=Union[RoutineOut, Error])
def get_routine(
    routine_id,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: RoutineQueries = Depends()
):
    routine = repo.get_one_routine(routine_id)
    return routine

@router.post("/api/routines", response_model=Union[RoutineOut, Error])
def create_routine(
    routine_in: RoutineIn,
    account_id: dict = Depends(authenticator.get_current_account_data),
    repo: RoutineQueries = Depends()
):
    routine = repo.create(routine_in, account_id["id"])
    return routine

@router.put("/api/routines/{routine_id}", response_model=RoutineOut)
def update_routine(
    routine_id: str,
    routine_in: RoutineIn,
    account_id: dict = Depends(authenticator.get_current_account_data),
    repo: RoutineQueries = Depends()
):
    routine = repo.update(routine_id=routine_id, account_id=account_id['id'], routine_in=routine_in)
    if routine is None:
        raise HTTPException(status_code=404, detail="Routine not found")
    return routine

@router.delete("/api/routines/{routine_id}", response_model=Deleted)
def delete_routine(
    routine_id: str,
    account_id: dict = Depends(authenticator.get_current_account_data),
    repo: RoutineQueries = Depends()
):
    deletion = repo.delete_routine(routine_id, account_id["id"])
    return deletion
