from pydantic import BaseModel
from typing import List
from models import WorkoutOut
from queries import accounts

class DuplicateAccountError(ValueError):
    pass

class AccountIn(BaseModel):
    full_name: str
    username: str
    email: str
    hashed_password: str
    workouts: List[WorkoutOut]

class AccountOut(AccountIn):
    id: str

class AccountQueries():

    def get(self, username: str) -> AccountOut:
        account = accounts.find_one({"username": username})
        if account is None:
            return None
        account["id"] = str(account["_id"])
        return AccountOut(**account)

    def create(self, info: AccountIn, hashed_password: str) -> AccountOut:
        #checks if an account with the same username or email already exists
        if accounts.find_one({"username": info.username}) is not None:
            raise DuplicateAccountError(f"Account with username {info.username} already exists.")

        account = info.dict()
        account['hashed_password'] = info.hashed_password
        result = accounts.insert_one(account)
        account["id"] = str(result.inserted_id)
        return AccountOut(**account)
