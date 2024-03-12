from pydantic import BaseModel, Field
from typing import List, Optional
from jwtdown_fastapi.authentication import Token


class Error(BaseModel):
    message: str

class Deleted(BaseModel):
    deleted: bool
    message: Optional[str]

class WorkoutExercise(BaseModel):
    name: str
    muscle_group: str
    set: str
    rep: str

class ExerciseIn(BaseModel):
    name: str
    muscle_group: str

class ExerciseOut(ExerciseIn):
    id: str

class ExerciseFilter(BaseModel):
    name: str = Field(None, description="Exercise Name To Filter By")
    muscle_group: str = Field(None, description="Muscle Group To Filter By")

class WorkoutIn(BaseModel):
    name: str
    exercises: List[WorkoutExercise]

class WorkoutOut(WorkoutIn):
    id: str

class RoutineIn(BaseModel):
    name: str
    description: str
    workouts: List[WorkoutOut]

class RoutineOut(RoutineIn):
    id: str

#queries
class AccountIn(BaseModel):
    full_name: str
    username: str
    email: str
    password: str

class AccountOut(BaseModel):
    id: str
    full_name: str
    username: str
    email: str

class Account(AccountOut):
    hashed_password: str

#routers
class AccountForm(BaseModel):
    username: str
    password: str

class AccountToken(Token):
    account: AccountOut

class HttpError(BaseModel):
    detail: str

class DeleteStatus(BaseModel):
    success: bool
    message: str

class RecentWorkoutIn(BaseModel):
    name: str

class RecentWorkoutOut(RecentWorkoutIn):
    id: str
    created_on: str
    account_id: str
