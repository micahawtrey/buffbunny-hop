# Buffbunny Hop

- Micah Awtrey
- Trevor Cannatella
- Andrew Brewer
- Jory Bennett

From fluff to buff!

## Design

 - [API Design](docs/api.md)
 - [Data Model](docs/data-model.md)
 - [GHI](docs/GHI Page Layouts.md)

## Intended Market

Trainers and clients who need a routine designed for them to help them go from fluff to buff!

## Functionality

- Users can create workouts utilizing a list of curated exercises available for every muscle group!
- Routines can then be created using those workouts, so users know exactly what workout to do on every day.
- When a user completes a workout on their routine, they can click "Complete workout" to add it to their recent workouts.

## Project Initialization

1. Clone the repository down to your local machine
2. CD into the new project directory
3. Create a file name ".env" within the root directory
4. Add a key to .env named "SIGNING_KEY" with your unique signing key.
5. Add a key to .env named "RAPID_API_KEY" with your unique API key for [ExerciseDB](https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb/pricing)
6. Add a key to .env named "PEXELS_KEY" with your unique API key for [Pexels](https://www.pexels.com/api/).
7. Run `docker volume create mongo-data`
8. Run `docker compose build`
9. Run `docker compose up`
10. Navigate to [Buffbunny Hop](http://localhost:5173/)!
