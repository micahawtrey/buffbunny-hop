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

@router.get("/api/routines", response_model=Union[List[RoutineOut], Error])
def get_all_routines(
    account_id: dict = Depends(authenticator.get_current_account_data),
    repo: RoutineQueries = Depends()
):
    try:
        routines_list = repo.get_all_routines()
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
            )
    return routines_list

@router.get("/api/routines/{routine_id}", response_model=Union[RoutineOut, Error])
def get_routine(
    routine_id,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: RoutineQueries = Depends()
):
    routine = repo.get_one_routine(routine_id)
    if routine is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Routine not found"
        )
    return routine

@router.post("/api/routines", response_model=Union[RoutineOut, Error])
def create_routine(
    routine_in: RoutineIn,
    account_id: dict = Depends(authenticator.get_current_account_data),
    repo: RoutineQueries = Depends()
):
    routine = repo.create_routine(routine_in, account_id["id"])
    if routine is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Can't be created"
            )
    return routine

@router.put("/api/routines/{routine_id}", response_model=Union[RoutineOut, Error])
def update_routine(
    routine_id: str,
    routine_in: RoutineIn,
    account_id: dict = Depends(authenticator.get_current_account_data),
    repo: RoutineQueries = Depends()
):
    try:
        routine = repo.update_routine(routine_id=routine_id, account_id=account_id['id'], routine_in=routine_in)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Routine not found" + str(e)
            )
    return routine

@router.delete("/api/routines/{routine_id}", response_model=Deleted)
def delete_routine(
    routine_id: str,
    account_id: dict = Depends(authenticator.get_current_account_data),
    repo: RoutineQueries = Depends()
):
    try:
        deletion = repo.delete_routine(routine_id=routine_id, account_id=account_id["id"])
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Routine not found" + str(e)
        )
    return deletion
