from .queries import Queries
from models import ExerciseOut
from typing import List


class ExerciseQueries(Queries):
    DB_NAME = "buffbunny_hop"
    COLLECTION = "exercises"

    def get_all_exercises(self):
        exercises_list = []
        for exercise in self.collection.find():
            exercise["id"] = str(exercise["_id"])
            exercises_list.append(exercise)
        print("AHHHHHHHHHHHHHH Exercise List", exercises_list)
        return exercises_list
