from bson.objectid import ObjectId
from bson.errors import InvalidId
from .queries import Queries
from models import RoutineOut, RoutineIn


class RoutineQueries(Queries):
    DB_NAME = "buffbunny_hop"
    COLLECTION = "routines"

    def get_all_routines(self):
        try:
            routines_list = []
            for routine in self.collection.find():
                routine["id"] = str(routine["_id"])
                routines_list.append(routine)
            return routines_list
        except Exception as e:
            return {"message": "Unable to get routines " + str(e)}

    def get_one_routine(self, routine_id: str):
        try:
            routine = self.collection.find_one({"_id": ObjectId(routine_id)})
            if routine:
                routine["id"] = str(routine["_id"])
                return RoutineOut(**routine)
            return None
        except InvalidId:
            return {"message": "Invalid routine ID"}
        except Exception as e:
            return {"message": "Unable to get routine, " + str(e)}

    def create_routine(self, routine_in: RoutineIn, account_id: str):
        routine = routine_in.dict()
        routine["account_id"] = account_id
        self.collection.insert_one(routine)
        routine["id"] = str(routine["_id"])
        return RoutineOut(**routine)

    def update_routine(
            self,
            routine_id: str,
            account_id: str,
            routine_in: RoutineIn
            ):
        try:
            query = {
                '_id': ObjectId(routine_id),
                'account_id': account_id
            }
            if self.collection.find_one(
                    {"_id": ObjectId(routine_id)}
                    ) is None:
                return {"message": "Invalid routine ID"}
            changes = routine_in.dict()
            res = self.collection.update_one(query, {'$set': changes})
            if res.matched_count >= 1:
                changes['id'] = routine_id
                changes['account_id'] = account_id
                return changes
            else:
                return {"message": "No matching routine found to update"}

        except Exception as e:
            return {
                "message": "Unable to update routine, " + str(e)
                }

    def delete_routine(self, routine_id: str, account_id: str):
        try:
            result = self.collection.delete_one(
                {"_id": ObjectId(routine_id), "account_id": account_id}
                )
            if result.deleted_count > 0:
                return {"deleted": True}
            else:
                return {
                    "deleted": False,
                    "message": "No such routine exists for this account"
                    }
        except InvalidId:
            return {"deleted": False, "message": "Invalid routine ID"}
        except Exception as e:
            return {
                "deleted": False,
                "message": f"Error deleting routine: {str(e)}"
                }
