import os
import requests


PEXELS_KEY = os.getenv("PEXELS_KEY")


class PhotosGymApiQueries:
    def get_all_photos_gym_api(self):
        url = 'https://api.pexels.com/v1/search?query=workouts&per_page=30'
        headers = {
            'Authorization': PEXELS_KEY
            }
        res = requests.get(url, headers=headers)
        data = res.json()
        return data
