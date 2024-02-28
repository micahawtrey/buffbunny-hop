from pydantic import BaseModel
from typing import List
from .models import WorkoutOut
from .queries import Queries
from passlib.context import CryptContext

class DuplicateAccountError(ValueError):
    pass

class AccountIn(BaseModel):
    full_name: str
    username: str
    email: str
    password: str
    workouts: List[WorkoutOut]

class AccountOut(BaseModel):
    id: str
    full_name: str
    username: str
    email: str
    workouts: List[WorkoutOut]

class Account(AccountOut):
    hashed_password: str

class AccountQueries(Queries):
    DB_NAME = "buffbunny_hop"
    COLLECTION = "accounts"
    # pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    def get(self, username: str):
        account = self.collection.find_one({"username": username})
        if account is None:
            return None
        account["id"] = str(account["_id"])
        return Account(**account)

    def create(self, info: AccountIn, hashed_password: str):
        if self.get({"username": info.username}) is not None:
            raise DuplicateAccountError(f"Account with username {info.username} already exists.")

        account = info.dict()
        account["hashed_password"] = hashed_password
        del account["password"]
        self.collection.insert_one(account)
        account["id"] = str(account["_id"])
        return Account(**account)

    # def hash_password(self, password: str):
    #     return self.pwd_context.hash(password)
