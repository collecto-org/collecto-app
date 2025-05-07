import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CollectionSchema, } from './schemas/UniverseSchemas';

export const collectionsApi = createApi({
  reducerPath: 'collectionsApi',
  baseQuery: fetchBaseQuery(
    { baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ['collections'], // 
  endpoints: (builder) => ({
    getCollections: builder.query<CollectionSchema[], void>({
      query: () => '/collections',
      providesTags: ['collections'], // 
    }),
        updateCollections: builder.mutation<
          CollectionSchema,
          { id: string; data: Partial<CollectionSchema> }
        >({
          query: ({ id, data }) => ({
            url: `/collections/${id}`,
            method: "PUT",
            credentials: "include",
            body: data,
          }),
          invalidatesTags: ["collections"],
        }),
        postCollections: builder.mutation<CollectionSchema, CollectionSchema>({
          query: (data) => ({
            url: `/collections`,
            method: "POST",
            credentials: "include",
            body: data,
          }),
          invalidatesTags: ["collections"],
        }),
        deleteCollections: builder.mutation<CollectionSchema, { id: string }>({
          query: ({ id }) => ({
            url: `/collections/${id}`,
            method: "DELETE",
            credentials: "include",
          }),
          invalidatesTags: ["collections"],
        }),
  }),
});

export const {
  useGetCollectionsQuery,
  useDeleteCollectionsMutation,
  usePostCollectionsMutation,
  useUpdateCollectionsMutation,
} = collectionsApi;
