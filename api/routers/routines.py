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


@router.put("/api/routines/{routine_id}", response_model=RoutineOut)
def update_routine(
    routine_id: str,
    routine_in: RoutineIn,
    account_id: dict = Depends(authenticator.get_current_account_data),
    queries: RoutineQueries = Depends()
):
    routine = queries.update(routine_id=routine_id, account_id=account_id['id'], routine_in=routine_in)
    if routine is None:
        raise HTTPException(status_code=404, detail="Routine not found")
    return routine

