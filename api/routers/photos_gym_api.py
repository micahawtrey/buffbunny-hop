from fastapi import APIRouter,Depends, HTTPException
from queries.photos_gym_api import PhotosGymApiQueries
from typing import List

router = APIRouter()
queries = PhotosGymApiQueries()

@router.get('/api/photos_gym_api')
async def list_photos_gym_api(queries: PhotosGymApiQueries = Depends()):
    photos_gym_data = queries.get_all_photos_gym_api()
    return photos_gym_data