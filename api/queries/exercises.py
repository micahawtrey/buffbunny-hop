from .queries import Queries
from models import ExerciseOut, ExerciseIn
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

    def create_exercise(self, exercise_in: ExerciseIn):
        exercise_dict = exercise_in.dict()
        self.collection.insert_one(exercise_dict)
        exercise_dict['id'] = str(exercise_dict['_id'])
        return ExerciseOut(**exercise_dict)
