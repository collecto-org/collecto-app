import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UniverseSchema } from './schemas/UniverseSchemas';

export const universesApi = createApi({
  reducerPath: 'universesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Universes'], // 
  endpoints: (builder) => ({
    getUniverses: builder.query<UniverseSchema[], void>({
      query: () => '/universes',
      providesTags: ['Universes'], // Schema
    }),
    createUniverse: builder.mutation<UniverseSchema, Partial<UniverseSchema>>({
      query: (newData) => ({
        url: '/universes',
        method: 'POST',
        credentials:"include",
        body: newData,
      }),
      invalidatesTags: ['Universes'], 
    }),
    updateUniverse: builder.mutation<UniverseSchema, { id: string; data: Partial<UniverseSchema> }>({
      query: ({ id, data }) => ({
        url: `/universes/${id}`,
        method: 'PUT',
        credentials:"include",
        body: data,
      }),
      invalidatesTags: ['Universes'], 
    }),
    deleteUniverse: builder.mutation<void, string>({
      query: (id) => ({
        url: `/universes/${id}`,
        credentials:"include",
        method: 'DELETE',
      }),
      invalidatesTags: ['Universes'], 
    }),
  }),
});

export const {
  useGetUniversesQuery,
  useCreateUniverseMutation,
  useUpdateUniverseMutation,
  useDeleteUniverseMutation,
} = universesApi;
