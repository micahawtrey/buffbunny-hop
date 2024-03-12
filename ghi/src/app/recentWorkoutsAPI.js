import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const recentWorkoutsAPI = createApi({
    reducerPath: "recentWorkoutsAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_HOST,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        createRecentWorkout: builder.mutation({
            query: (body) => {
                return {
                    url: "/api/recent_workouts",
                    method: "DELETE",
                    body
                }
            }
        }),
        filterRecentWorkouts: builder.query({
            query: () => {
                return {
                    url: "/api/recent_workouts"
                }
            }
        })
    })
})

export const {
    useCreateRecentWorkoutMutation,
    useFilterRecentWorkoutsQuery
} = recentWorkoutsAPI
