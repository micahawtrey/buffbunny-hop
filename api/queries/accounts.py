from bson.objectid import ObjectId
from bson.errors import InvalidId
from typing import List
from models import AccountIn, Account
from .queries import Queries

class DuplicateAccountError(ValueError):
    pass

class AccountQueries(Queries):
    DB_NAME = "buffbunny_hop"
    COLLECTION = "accounts"

    def get(self, username: str):
        account = self.collection.find_one({"username": username})
        if account is None:
            return None
        account["id"] = str(account["_id"])
        return Account(**account)

    def create(self, info: AccountIn, hashed_password: str):
        if self.get({info.username}) is not None:
            raise DuplicateAccountError(f"Account with username {info.username} already exists.")

        account = info.dict()
        account["hashed_password"] = hashed_password
        del account["password"]
        self.collection.insert_one(account)
        account["id"] = str(account["_id"])
        return Account(**account)

    def delete_one(self, account_id: str) -> bool:
        result = self.collection.delete_one({"_id": account_id})
        return result.deleted_count > 0

    def update(self, account_id: str, account_in: AccountIn):
        query = {
            '_id': ObjectId(account_id),
            'account_id': account_id
        }
        changes = account_in.dict()
        res = self.collection.update_one(query, {'$set': changes})
        if res.matched_count >= 1:
            changes['id'] = account_id
            changes['account_id']
            return changes

    def delete_one(self, account_id: str) -> bool:
        result = self.collection.delete_one({"_id": account_id})
        return result.deleted_count > 0
