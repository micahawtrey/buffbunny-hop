from bson.objectid import ObjectId
from bson.errors import InvalidId
from models import WorkoutIn, WorkoutOut
from .queries import Queries


class WorkoutQueries(Queries):
    DB_NAME = "buffbunny_hop"
    COLLECTION = "workouts"

    def get_all_workouts(self):
        try:
            workout_list = []
            for workout in self.collection.find():
                workout["id"] = str(workout["_id"])
                workout_list.append(workout)
            return workout_list
        except Exception as e:
            return {"message": "Unable to get workouts" + str(e)}

    def get_one_workout(self, workout_id: str):
        try:
            workout = self.collection.find_one({"_id": ObjectId(workout_id)})
            if workout:
                workout["id"] = str(workout["_id"])
                return WorkoutOut(**workout)
            return None
        except InvalidId:
            return {"message": "Invalid workout ID"}
        except Exception as e:
            return {"message": "Unable to get workout, " + str(e)}

    def create_workout(self, workout_in: WorkoutIn, account_id: str):
        workout = workout_in.dict()
        workout["account_id"] = account_id
        self.collection.insert_one(workout)
        workout["id"] = str(workout["_id"])
        return WorkoutOut(**workout)

    def update_workout(self, workout_id: str, workout_in: WorkoutIn, account_id: str):
        try:
            query = {
            '_id': ObjectId(workout_id),
            'account_id': account_id
            }
            if self.collection.find_one({"_id": ObjectId(workout_id)}) is None:
                return {"message": "Invalid workout ID"}
            workout = workout_in.dict()
            self.collection.update_one(query, {"$set": workout})
            updated_workout = self.collection.find_one({"_id": ObjectId(workout_id)})
            updated_workout["id"] = str(updated_workout["_id"])
            return WorkoutOut(updated_workout)
        except Exception as e:
            return {"message": "Unable to update workout, " + str(e)}

    def delete_workout(self, workout_id: str, account_id: str):
        try:
            result = self.collection.delete_one({"_id": ObjectId(workout_id), "account_id": account_id})
            if result.deleted_count > 0:
                return {"deleted": True}
            else:
                return {"deleted": False, "message": "No such workout exists for this account"}
        except InvalidId:
            return {"deleted": False, "message": "Invalid workout ID"}
        except Exception as e:
            return {"deleted": False, "message": f"Error deleting workout: {str(e)}"}
