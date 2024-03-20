from models import RecentWorkoutIn, RecentWorkoutOut
from .queries import Queries
from fastapi import status, HTTPException
from datetime import datetime
from bson.objectid import ObjectId


class RecentWorkoutQueries(Queries):
    DB_NAME = "buffbunny_hop"
    COLLECTION = "recent_workouts"

    def filter_recent_workouts(self, account_id: str):
        try:
            recent_workouts = []
            for workout in self.collection.find({"account_id": account_id}):
                workout["id"] = str(workout["_id"])
                workout["created_on"] = str(workout["created_on"])
                recent_workouts.append(workout)
            return recent_workouts
        except Exception as e:
            return {"message": "Unable to get recent workouts, " + str(e)}

    def delete_recent_workout(self, recent_workout_id):
        try:
            self.collection.delete_one({"_id": ObjectId(recent_workout_id)})
        except Exception as e:
            return {"message": "Unable to delete recent workout, " + str(e)}

    def create_recent_workout(
            self,
            recent_workout_in: RecentWorkoutIn,
            account_id: str
            ):
        try:
            recent_workouts_list = self.filter_recent_workouts(account_id)
            if len(recent_workouts_list) > 3:
                self.delete_recent_workout(recent_workouts_list[0]["_id"])
            recent_workout = recent_workout_in.dict()
            recent_workout["account_id"] = account_id
            recent_workout["created_on"] = datetime.now()
            self.collection.insert_one(recent_workout)
            recent_workout["id"] = str(recent_workout["_id"])
            recent_workout["created_on"] = str(
                recent_workout["created_on"]
                )
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=str(e)
                )
        return RecentWorkoutOut(**recent_workout)
