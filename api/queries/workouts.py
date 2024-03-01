from bson.objectid import ObjectId
from bson.errors import InvalidId
from typing import List
from models import AccountIn, Account, WorkoutExercise, ExerciseIn, WorkoutIn, WorkoutOut
from .queries import Queries

class DuplicateAccountError(ValueError):
    pass

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
            return {"message": "Unable to get workouts"}

    def get(self, workout_id: str):
        try:
            workout = self.collection.find_one({"_id": ObjectId(workout_id)})
            if workout is None:
                return None
            workout["id"] = str(workout["_id"])
            return WorkoutOut(**workout)
        except Exception as e:
            return {"message": "Unable to get workout, "+ str(e)}

    def create(self, info: WorkoutIn):
        workout = info.dict()
        self.collection.insert_one(workout)
        workout["id"] = str(workout["_id"])
        return WorkoutOut(**workout)

    def update(self, workout_id: str, info: WorkoutIn):
        try:
            if self.collection.find_one({"_id": ObjectId(workout_id)}) is None:
                return {"message": "Invalid workout ID"}
            workout = info.dict()
            self.collection.update_one({"_id": ObjectId(workout_id)}, {"$set": workout})
            updated_workout = self.collection.find_one({"_id": ObjectId(workout_id)})
            updated_workout["id"] = str(updated_workout["_id"])
            return updated_workout
        except Exception as e:
            return {"message": "Unable to update workout, "+ str(e)}

    def delete_workout(self, workout_id: str, account_id: str):
        try:
            result = self.collection.delete_one({"_id": ObjectId(workout_id), "account_id": account_id})
            if result.deleted_count > 0:
                return {"deleted": True}
            else:
                return {"deleted": False, "message": "No such workout exists for this account"}
        except InvalidId:
            return {"deleted": False, "message": "Invalid exercise ID"}
        except Exception as e:
            return {"deleted": False, "message": f"Error deleting workout: {str(e)}"}
