import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const blogApi = createApi({
    reducerPath: 'blogApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:8000/api',
        tagTypes: ['Post'],
    }),
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => '/blog',
            providesTags: ['Post']
    }),
        getComments: builder.query({
            query: () => '/comment/?ordering=-date',
 
    })
    
})
})

export const {
    useGetPostsQuery,
    useGetCommentsQuery,
} = blogApi;

