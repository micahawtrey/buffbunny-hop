from pydantic import BaseModel


class DuplicateAccountError(ValueError):
    pass

class AccountIn(BaseModel):
    email: str
    password: str
    full_name: str


class AccountOut(BaseModel):
    id: str
    email: str
    full_name: str

class AccountQueries(Queries):
    #region properties

    def get(self, email: str) -> AccountOut:

    def create(self, info: AccountIn, hashed_password: str) -> AccountOut:
