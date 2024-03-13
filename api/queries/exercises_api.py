import requests
from api_keys import RAPIDAPI_KEY

class ExerciseApiQueries:
    def get_all_exercises_api(self, limit: int = 100):
        url = 'https://exercisedb.p.rapidapi.com/exercises'
        params = {
             'limit': limit
        }
        headers = {
            'X-RapidAPI-Key': RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
        res = requests.get(url, headers=headers, params=params)
        data = res.json()
        return data

    def get_exercise_details_api(self, name: str):
            url = f'https://exercisedb.p.rapidapi.com/exercise/{name}'
            headers = {
                'X-RapidAPI-Key': RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
            }
            res = requests.get(url, headers=headers)
            if res.status_code == 200:
                return res.json()
            elif res.status_code == 404:
                return None  # Exercise not found
            else:
                # Handle other status codes as needed
                raise Exception(f"Failed to fetch exercise details. Status code: {res.status_code}")
