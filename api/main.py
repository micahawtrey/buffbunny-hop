from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from authenticator import authenticator
from routers import accounts
from routers import exercises
from routers import workouts
from routers import routines
from routers import recent_workouts
from routers import exercises_api
from routers import photos_gym_api

app = FastAPI()
app.include_router(authenticator.router)
app.include_router(accounts.router, tags=["Accounts"])
app.include_router(exercises.router, tags=["Exercises"])
app.include_router(workouts.router, tags=["Workouts"])
app.include_router(routines.router, tags=["Routines"])
app.include_router(exercises_api.router, tags=["Exercise API"])
app.include_router(recent_workouts.router, tags=["Recent Workouts"])
app.include_router(photos_gym_api.router, tags=['Gym Photos API'])

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00"
        }
    }
