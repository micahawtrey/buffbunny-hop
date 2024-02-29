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

    def get(self, id: str):
        workout = self.collection.find_one({"_id": ObjectId(id)})
        if workout is None:
            return None
        workout["id"] = str(workout["_id"])
        return WorkoutOut(**workout)

    def create(self, info: WorkoutIn):

        workout = info.dict()
        self.collection.insert_one(workout)
        workout["id"] = str(workout["_id"])
        return WorkoutOut(**workout)
