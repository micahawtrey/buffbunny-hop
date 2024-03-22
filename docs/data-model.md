# Data models

## Buffbunny Hop

---

### Exercise

| name          | type   | unique | optional |
| --------------| ------ | ------ | -------- |
| name          | string | no     | no       |
| muscle_group  | string | no     | no       |
| set           | string | no     | no       |
| rep           | string | no     | no       |
| description   | string | no     | no       |


### Workout

| name          | type   | unique | optional |
| ------------- | -------| ------ | -------- |
| name          | string | no     | no       |
| description   | string | no     | no       |
| exercises     | string | no     | no       |


### Account

| name             | type   | unique | optional |
| -----------------| -------| ------ | -------- |
| full_name        | string | no     | no       |
| username         | string | yes    | no       |
| email            | string | no     | no       |
| hashed_password  | string | no     | no       |


### Routine
| name          | type   | unique | optional |
| --------------| -------| ------ | -------- |
| name          | string | no     | no       |
| description   | string | no     | no       |
| workouts      | string | no     | no       |
| account_id    | string | no     | no       |


### RecentWorkout
| name          | type   | unique | optional |
| --------------| -------| ------ | -------- |
| name          | string | no     | no       |
| created_on    | string | no     | no       |
| account_id    | string | no     | no       |
