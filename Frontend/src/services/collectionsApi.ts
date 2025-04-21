import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CollectionSchema, } from './schemas/UniverseSchemas';

export const collectionsApi = createApi({
  reducerPath: 'collectionsApi',
  baseQuery: fetchBaseQuery(
    { baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ['collections'], // 
  endpoints: (builder) => ({
    getCollections: builder.query<CollectionSchema[], void>({
      query: () => '/api/collections',
      providesTags: ['collections'], // 
    }),
  }),
});

export const {
  useGetCollectionsQuery

} = collectionsApi;
