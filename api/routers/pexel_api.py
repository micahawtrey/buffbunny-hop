import os
from fastapi import FastAPI, APIRouter
from ..api_keys import PexelApiKey

router = APIRouter()
key = PexelApiKey

@app.get("/api/api-key")
def get_api_key():
    api_key = os.environ.get('key', '')
    return {"api_key": api_key}
