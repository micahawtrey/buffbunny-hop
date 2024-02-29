from bson.objectid import ObjectId
from bson.errors import InvalidId
from .queries import Queries
from models import ExerciseOut, ExerciseIn
from typing import List


class ExerciseQueries(Queries):
    DB_NAME = "buffbunny_hop"
    COLLECTION = "exercises"

    def get_all_exercises(self):
        try:
            exercises_list = []
            for exercise in self.collection.find():
                exercise["id"] = str(exercise["_id"])
                exercises_list.append(exercise)
            return exercises_list
        except Exception as e:
            return {"message": "Unable to get exercises"}

    def get_one_exercise(self, exercise_id: str, account_id: str):
        try:
            exercise = self.collection .find_one({"_id": ObjectId(exercise_id), "account_id": account_id})
            if exercise:
                exercise["id"] = str(exercise["_id"])
                return ExerciseOut(**exercise)
            return None
        except InvalidId:
            return {"message": "Invalid exercise ID"}
        except Exception as e:
            return{"message": "Unable to get exercise"}


    def create_exercise(self, exercise_in: ExerciseIn, account_id: str):
        exercise_dict = exercise_in.dict()
        exercise_dict["account_id"] = account_id
        self.collection.insert_one(exercise_dict)
        exercise_dict['id'] = str(exercise_dict['_id'])
        return ExerciseOut(**exercise_dict)

    def update(self, exercise_id: str, account_id: str, exercise_in: ExerciseIn):
        query = {
            '_id': ObjectId(exercise_id),
            'account_id': account_id
        }
        changes = exercise_in.dict()
        res = self.collection.update_one(query, {'$set': changes})
        if res.matched_count >= 1:
            changes['id'] = exercise_id
            changes['account_id'] = account_id
            return changes

    def delete_exercise(self, exercise_name: str, account_id: str):
        try:
            result = self.collection.delete_one({"id": ObjectId(exercise_id), "account_id": account_id})
            if result.deleted_count > 0:
                return {"deleted": True}
            else:
                return {"deleted": False, "message": "No such exercise exists for this account"}
        except InvalidId:
            return {"deleted": False, "message": "Invalid exercise ID"}
        except Exception as e:
            return {"deleted": False, "message": f"Error deleting exercise: {str(e)}"}
