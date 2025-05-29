import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
export const jsondataApi=createApi({
    reducerPath: 'jsondataApi',
    baseQuery: fetchBaseQuery({ baseUrl: `https://world.openfoodfacts.net/api/v2/` }),
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: (barcode) => `search?code=${barcode}`,

        }),
       
    }),
})
export const { useGetPostsQuery } = jsondataApi;