import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const exerciseAPI = createApi({
    reducerPath: "exerciseAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_HOST,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        getAllExercises: builder.query({
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
        createExercise: builder.mutation({
            query: (body) => {
                return {
                    url: "/api/exercises",
                    method: "POST",
                    body
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
    useCreateExerciseMutation,
    useDeleteExerciseMutation,
    useGetAllExercisesQuery,
    useGetOneExerciseQuery,
    useUpdateExerciseMutation
} = exerciseAPI
