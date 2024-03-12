import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const exerciseAPI = createApi({
    reducerPath: "exerciseAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_HOST,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        filterExercises: builder.query({
            query: () => {
                return {
                    url: "/api/exercises"
                }
            }
        }),
        getOneExercise: builder.query({
            query: (exercise_id) => {
                return {
                    url: `/api/exercises/${exercise_id}`
                }
            }
        }),
        updateExercise: builder.mutation({
            query: (body, exercise_id) => {
                return {
                    url: `/api/exercises/${exercise_id}`,
                    method: "PUT",
                    body
                }
            }
        }),
        deleteExercise: builder.mutation({
            query: (exercise_id) => {
                return {
                    url: `/api/exercises/${exercise_id}`,
                    method: "DELETE"
                }
            }
        })
    })
})

export const {
    useDeleteExerciseMutation,
    useFilterExercisesQuery,
    useGetOneExerciseQuery,
    useUpdateExerciseMutation
} = exerciseAPI
