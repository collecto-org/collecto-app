import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Universe } from './schemas/UniverseSchemas';

export const universesApi = createApi({
  reducerPath: 'universesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Universes'], // 
  endpoints: (builder) => ({
    getUniverses: builder.query<Universe[], void>({
      query: () => '/universes',
      providesTags: ['Universes'], // 
    }),
    createUniverse: builder.mutation<Universe, Partial<Universe>>({
      query: (newData) => ({
        url: '/universes',
        method: 'POST',
        body: newData,
      }),
      invalidatesTags: ['Universes'], 
    }),
    updateUniverse: builder.mutation<Universe, { id: string; data: Partial<Universe> }>({
      query: ({ id, data }) => ({
        url: `/universes/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Universes'], 
    }),
    deleteUniverse: builder.mutation<void, string>({
      query: (id) => ({
        url: `/universes/${id}`,
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
