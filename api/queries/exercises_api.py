import requests
from api_keys import RAPIDAPI_KEY

class ExerciseApiQueries:
    def get_all_exercises_api(self, limit: int = 1400):
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
            url = f'https://exercisedb.p.rapidapi.com/exercises/name/{name}'
            headers = {
                'X-RapidAPI-Key': RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
            }
            res = requests.get(url, headers=headers)
            data = res.json()
            return data[0]

    def get_exercise_target_api(self, target: str):
            url = f'https://exercisedb.p.rapidapi.com/exercises/target/{target}'
            headers = {
                'X-RapidAPI-Key': RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
            }
            res = requests.get(url, headers=headers)
            data = res.json()
            print('HERE',data)
            return data
