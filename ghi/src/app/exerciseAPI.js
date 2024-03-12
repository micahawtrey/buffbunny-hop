import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const X_RAPID_API = 'https://api.third-party.com'

export const exerciseAPI = createApi({
    reducerPath: "exerciseAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: X_RAPID_API,
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
