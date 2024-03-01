from bson.objectid import ObjectId
from bson.errors import InvalidId
from .queries import Queries
from models import RoutineOut, RoutineIn
from typing import List

class RoutineQueries(Queries):
    DB_NAME = "buffbunny_hop"
    COLLECTION = "routines"

    def get(self, routine_id: str):
        try:
            routine = self.collection.find_one({"_id": ObjectId(routine_id)})
            if routine is None:
                return {"message": "Invalid routine ID"}
            routine["id"] = str(routine["_id"])
            return RoutineOut(routine)
        except InvalidId:
            return {"message": "Invalid routine ID"}
        except Exception as e:
            return {"message": "Unable to get workout, "+ str(e)}

    def get_all_routines(self, routine_id: str):
        try:
            routines_list = []
            for routine in self.collection.find():
                routine["id"] = str(routine["_id"])
                routines_list.append(routine)
            return routines_list
        except Exception as e:
            return {"message": "Unable to get exercises " + str(e)}

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

    def delete_routine(self, routine_id: str, account_id: str):
        try:
            result = self.collection.delete_one({"id": ObjectId(routine_id), "account_id": account_id})
            if result.deleted_count > 0:
                return {"deleted": True}
            else:
                return {"deleted": False, "message": "No such routine exists for this account"}
        except InvalidId:
            return {"deleted": False, "message": "Invalid routine ID"}
        except Exception as e:
            return {"deleted": False, "message": f"Error deleting routine: {str(e)}"}
