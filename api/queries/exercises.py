from bson.objectid import ObjectId
from bson.errors import InvalidId
from .queries import Queries
from models import ExerciseOut, ExerciseIn
from fastapi import status, HTTPException


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
            return {"message": "Unable to get exercises" + str(e)}

    def get_one_exercise(self, exercise_id: str):
        try:
            exercise = self.collection.find_one({"_id": ObjectId(exercise_id)})
            if exercise:
                exercise["id"] = str(exercise["_id"])
                return ExerciseOut(**exercise)
            return None
        except InvalidId:
            return {"message": "Invalid exercise ID"}
        except Exception as e:
            return{"message": "Unable to get exercise" + str(e)}


    def create_exercise(self, exercise_in: ExerciseIn, account_id: str):
        try:
            exercise = exercise_in.dict()
            exercise["account_id"] = account_id
            self.collection.insert_one(exercise)
            exercise['id'] = str(exercise['_id'])
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=str(e)
                )
        return ExerciseOut(**exercise)

    def update_exercise(self, exercise_id: str, account_id: str, exercise_in: ExerciseIn):
        try:
            query = {
                '_id': ObjectId(exercise_id),
                'account_id': account_id
            }
            if self.collection.find_one({"_id": ObjectId(exercise_id)}) is None:
                return {"message": "Invalid exercise ID"}
            if self.collection.find_one(query) is None:
                return {"message": "This exercise is not associated with the logged in user"}
            changes = exercise_in.dict()
            res = self.collection.update_one(query, {'$set': changes})
            if res.matched_count >= 1:
                updated_workout = self.collection.find_one({"_id": ObjectId(exercise_id)})
                updated_workout["id"] = str(updated_workout["_id"])
                return updated_workout
            else:
                return {"message": "No exercise was updated"}
        except Exception as e:
            return {"message": "Unable to update exercise: " + str(e)}

    def delete_exercise(self, exercise_id: str, account_id: str):
        try:
            result = self.collection.delete_one({"_id": ObjectId(exercise_id), "account_id": account_id})
            if result.deleted_count > 0:
                return {"deleted": True}
            else:
                return {"deleted": False, "message": "No such exercise exists for this account"}
        except InvalidId:
            return {"deleted": False, "message": "Invalid exercise ID"}
        except Exception as e:
            return {"deleted": False, "message": f"Error deleting exercise: {str(e)}"}
