import os
from pymongo import MongoClient


client = MongoClient(os.environ.get("DATABASE_URL"))


class Queries:
    @property
    def collection(self):
        db = client[self.DB_NAME]
        return db[self.COLLECTION]
