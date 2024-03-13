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
        }),
        getExerciseApiDetails: builder.query({
            query: (name) => {
                return {
                    url: `/api/exercises_api/${name}`,
                }
            }
        }),
        getExerciseApiList: builder.query({
            query: () => {
                return {
                    url: "/api/exercises_api"
                }
            }
        }),
        getExerciseApiByTarget: builder.query({
            query: (target) => {
                return {
                    url: `/api/exercises_api/target/${target}`
                }
            }
        })
    })
})

export const {
    useDeleteExerciseMutation,
    useFilterExercisesQuery,
    useGetOneExerciseQuery,
    useUpdateExerciseMutation,
    useGetExerciseApiDetailsQuery,
    useGetExerciseApiByTargetQuery,
    useGetExerciseApiListQuery
} = exerciseAPI
