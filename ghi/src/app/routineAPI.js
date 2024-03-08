import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const routineAPI = createApi({
    reducerPath: "routineAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_HOST,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        getAllRoutines: builder.query({
            query: () => {
                return {
                    url: "/api/routines",
                }
            }
        }),
        getOneRoutine: builder.query({
            query: (routine_id) => {
                return {
                    url: `/api/routines/${routine_id}`,
                }
            }
        })



    })
})

export const {
    useGetAllRoutinesQuery,
} = routineAPI
