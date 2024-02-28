from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from authenticator import authenticator

from queries.accounts import (
    AccountQueries,
    DuplicateAccountError,
)
from models import AccountForm,AccountToken,HttpError, AccountIn, DeleteStatus

router = APIRouter()


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = repo.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())

@router.delete('/api/projects/{account_id}', response_model=DeleteStatus)
def delete_account(
    account_id: str,
    account_queries: AccountQueries = Depends()
) -> DeleteStatus:
    deletion_success = account_queries.delete_one(account_id)
    if deletion_success:
        return DeleteStatus(success=True, message="Account deleted successfully.")
    else:
        raise HTTPException(status_code=404, detail="Account not found.")
