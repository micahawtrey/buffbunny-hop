# APIs

## Accounts

These APIs allow for the creation, update, and deletion of accounts.

- **Methods**: `POST`, `PUT`, `DELETE`
- **Paths**: `/api/accounts`, `/api/accoutns/{account_id}`

Inputs:

```json
{
  "full_name": "string",
  "username": "string",
  "email": "string",
  "password": "string"
}
```

Outputs:

```json
{
  "access_token": "string",
  "token_type": "Bearer",
  "account": {
    "id": "string",
    "full_name": "string",
    "username": "string",
    "email": "string"
  }
}
```

## Login

These APIs allow for logging a user in and logging them out.

- **Methods**: `POST`, `DELETE`
- **Paths**: `/login`

Inputs:

FormData:
```json
{
  "username": "string",
  "password": "string"
}
```

Outputs:
```json
{
  "access_token": "string",
  "token_type": "Bearer"
}
```

## Exercises

These APIs allow for the creation and modification of new exercises
not found in the 3rd party APIs exercise list.

- **Methods**: `GET`, `POST`, `PUT`, `DELETE`
- **Paths**: `/api/exercises`, `/api/exercises/{exercise_id}`

Inputs:

```json
{
  "name": "string",
  "muscle_group": "string"
}
```

Outputs:

```json
{
  "name": "string",
  "muscle_group": "string",
  "id": "string"
}
```

### Filter Exercises

This API allows the filtering of user created exercises.

- **Method**: `GET`
- **Path**: `/api/exercises`

Inputs:

```json
{
  "name": Optional"string",
  "muscle_group": Optional"string"
}
```

Outputs:

```json
[
  {
    "name": "string",
    "muscle_group": "string",
    "id": "string"
  }
]
```

## Workouts

These APIs allow for the creation and modification of workouts,
which are comprised of exercises.

- **Methods**: `GET`, `POST`, `PUT`, `DELETE`
- **Paths**: `/api/workouts`, `/api/workouts/{workout_id}`

Inputs:

```json
{
  "name": "string",
  "description": "string",
  "exercises": [
    {
      "name": "string",
      "muscle_group": "string",
      "set": "string",
      "rep": "string"
    }
  ]
}
```

Outputs:

```json
{
  "name": "string",
  "description": "string",
  "exercises": [
    {
      "name": "string",
      "muscle_group": "string",
      "set": "string",
      "rep": "string"
    }
  ],
  "id": "string"
}
```

### Get All Workouts

This API returns a list of all the created workouts.

- **Method**: `GET`
- **Path**: `/api/workouts`

Outputs:

```json
[
  {
    "name": "string",
    "description": "string",
    "exercises": [
      {
        "name": "string",
        "muscle_group": "string",
        "set": "string",
        "rep": "string"
      }
    ],
    "id": "string"
  }
]
```

## Routines

These APIs allow for the creation and modification of routines,
which are comprised of workouts.

- **Methods**: `GET`, `POST`, `PUT`, `DELETE`
- **Paths**: `/api/routines`, `/api/routines/{routines_id}`

Inputs:

```json
{
  "name": "string",
  "description": "string",
  "workouts": [
    {
      "name": "string",
      "description": "string",
      "exercises": [
        {
          "name": "string",
          "muscle_group": "string",
          "set": "string",
          "rep": "string"
        }
      ],
      "id": "string"
    }
  ]
}
```

Outputs:

```json
{
  "name": "string",
  "description": "string",
  "workouts": [
    {
      "name": "string",
      "description": "string",
      "exercises": [
        {
          "name": "string",
          "muscle_group": "string",
          "set": "string",
          "rep": "string"
        }
      ],
      "id": "string"
    }
  ],
  "id": "string",
  "account_id": "string"
}
```

### Get All Routines

This API returns a list of the created routines.

- **Method**: `GET`
- **Path**: `/api/routines`

Outputs:

```json
[
  {
    "name": "string",
    "description": "string",
    "workouts": [
      {
        "name": "string",
        "description": "string",
        "exercises": [
          {
            "name": "string",
            "muscle_group": "string",
            "set": "string",
            "rep": "string"
          }
        ],
        "id": "string"
      }
    ],
    "id": "string",
    "account_id": "string"
  }
]
```

## Recent Workouts

These APIs allow for the creation of a user's recently
completed workouts, as well as getting all of the user's
recently completed workouts. These APIs utilize the
token information for the logged in user.


- **Methods**: `GET`, `POST`
- **Paths**: `/api/recent_workouts`

Inputs:

```json
{
  "name": "string"
}
```

Outputs:

```json
{
  "name": "string",
  "id": "string",
  "created_on": "string",
  "account_id": "string"
}
```

## 3rd Party Exercise API

### Get all 3rd Party Exercises

- **Method**: `GET`
- **Path**: `/api/exercises_api`

Outputs:

```json
{
  "exercise": [
    {
      "name": "string",
      "target": "string",
      "url": "string"
    }
  ]
}
```

### Get One 3rd Party Exercise

- **Method**: `GET`
- **Path**: `/api/exercises_api/{name}`

Outputs:

```json
{
  "name": "string",
  "target": "string",
  "gifUrl": "string",
  "instructions": [
    "string"
  ]
}
```

### Get All 3rd Party Exercises by Target

- **Method**: `GET`
- **Path**: `/api/exercises_api/target/{target}`

Outputs:

```json
[
  {
    "name": "string",
    "target": "string",
    "gifUrl": "string",
    "instructions": [
      "string"
    ]
  }
]
```
