import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const accountApi = createApi({
    reducerPath: "accountApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.VITE_API_HOST,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        createAccount: builder.mutation({
            query: info => {
                let formData = new FormData()
                formData.append("name", info.name)
                formData.append("username", info.username)
                formData.append("password", info.password)
                formData.append("email", info.email)

                return {
                    url: "/api/accounts",
                    method: "post",
                    body: formData,
                    credentials: "include"
                }
            }
        }),
        login: builder.mutation({
            query: info => {
                let formData = null;
                if (info instanceof HTMLElement) {
                    formData = new FormData(info);
                } else {
                    formData = new FormData();
                    formData.append('username', info.username);
                    formData.append('password', info.password);
                }
                return {
                    url: '/token',
                    method: 'post',
                    body: formData,
                    credentials: 'include',
                };
            },
            invalidatesTags: result => {
                return (result && ['Account']) || [];
            },
        }),
    })
})

export const {
    useCreateAccountMutation,
    useLoginMutation
} = accountApi
