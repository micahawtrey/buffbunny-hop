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
        account = info.dict()
        account[""]
