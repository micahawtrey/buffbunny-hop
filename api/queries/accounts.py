from pydantic import BaseModel
from typing import List
from models import WorkoutOut
from queries import accounts
from passlib.context import CryptContext

class DuplicateAccountError(ValueError):
    pass

class AccountIn(BaseModel):
    full_name: str
    username: str
    email: str
    password: str
    workouts: List[WorkoutOut]

class AccountOut(AccountIn):
    id: str

class AccountQueries():
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    def get(self, username: str) -> AccountOut:
        account = accounts.find_one({"username": username})
        if account is None:
            return None
        account["id"] = str(account["_id"])
        return AccountOut(**account)

    def create(self, info: AccountIn) -> AccountOut:
        if accounts.find_one({"username": info.username}) is not None:
            raise DuplicateAccountError(f"Account with username {info.username} already exists.")

        hashed_password = self.hash_password(info.password)
        account = info.dict()
        account['password'] = hashed_password
        result = accounts.insert_one(account)
        account["id"] = str(result.inserted_id)
        return AccountOut(**account)

    def hash_password(self, password: str):
        return self.pwd_context.hash(password)
