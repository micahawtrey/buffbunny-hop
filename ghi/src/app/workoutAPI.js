import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const workoutAPI = createAPI({
    reducerPath: "workoutAPI",
    basequery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_HOST,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        getAllWorkouts: builder.query({
            query: () => {
                return {
                    url: '/api/workouts',
                }
            }
        }),
        getOneWorkout: builder.query({
            query: (workout_id) => {
                return {
                    url: `/api/workouts/${workout_id}`,
                }
            }
        })
    })


})



export const {
    useGetOneWorkoutQuery,
    useGetAllWorkoutsQuery,
} = workoutAPI
