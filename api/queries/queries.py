import os
from pymongo import MongoClient

client = MongoClient(os.environ.get("DATABASE_URL"))
# db = client.buffbunny_hop

# routines = db.routines
# workouts = db.workouts
# exercises = db.exercises
# accounts = db.accounts

class Queries:
    @property
    def collection(self):
        db = client[self.DB_NAME]
        return db[self.COLLECTION]
