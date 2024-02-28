from pydantic import BaseModel
from typing import List
from jwtdown_fastapi.authentication import Token

class Exercise(BaseModel):
    name: str
    set: str
    rep: str

class ExerciseIn(BaseModel):
    name: str
    muscle_group: str

class ExerciseOut(ExerciseIn):
    id: str

class WorkoutIn(BaseModel):
    name: str
    exercises: List[Exercise]

class WorkoutOut(WorkoutIn):
    id: str

class RoutineIn(BaseModel):
    name: str
    workouts: List[WorkoutOut]

class RoutineOut(RoutineIn):
    id: str

#queries
class AccountIn(BaseModel):
    full_name: str
    username: str
    email: str
    password: str
    workouts: List[WorkoutOut]

class AccountOut(BaseModel):
    id: str
    full_name: str
    username: str
    email: str
    workouts: List[WorkoutOut]

class Account(AccountOut):
    hashed_password: str
    
#routers
class AccountForm(BaseModel):
    username: str
    hashed_password: str

class AccountToken(Token):
    account: AccountOut

class HttpError(BaseModel):
    detail: str
