from typing import List
from models import AccountIn, Account, Exercise, ExerciseIn
from .queries import Queries


def create(self, info: ExerciseIn):
        if self.get(info.name) is not None:
            raise ValueError(f"Exercise with name {info.name} already exists.")

        exercise = info.dict()
        self.collection.insert_one(exercise)
        exercise["id"] = str(exercise["_id"])
        return Exercise(**exercise)
