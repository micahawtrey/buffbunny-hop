import os
from pymongo import MongoClient

client = MongoClient(os.environ.get("DATABASE_URL"))
db = client.buffbunny_hop

routines = db.routines
workouts = db.workouts
exercises = db.exercises
accounts = db.accounts
