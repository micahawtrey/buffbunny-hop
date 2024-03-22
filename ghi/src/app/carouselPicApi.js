import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const carouselPicAPI = createApi({
    reducerPath: "carouselPicAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_HOST,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        getAllCarouselPicAPI: builder.query({
            query: () => {
                return {
                    url: '/api/photos_gym_api',
                };
            },
        }),
    }),
});

export const {
    useGetAllCarouselPicAPIQuery
} = carouselPicAPI;
