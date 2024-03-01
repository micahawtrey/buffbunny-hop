from bson.objectid import ObjectId
from bson.errors import InvalidId
from .queries import Queries
from models import RoutineOut, RoutineIn
from typing import List


class RoutineQueries(Queries):
    DB_NAME = "buffbunny_hop"
    COLLECTION = "routines"


    def update(self, routine_id: str, account_id: str, routine_in: RoutineIn):
        query = {
            '_id': ObjectId(routine_id),
            'account_id': account_id
        }
        changes = routine_in.dict()
        res = self.collection.update_one(query, {'$set': changes})
        if res.matched_count >= 1:
            changes['id'] = routine_id
            changes['account_id'] = account_id
            return changes

   
