import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { statusSchema, TransactionSchema } from './schemas/UniverseSchemas';

export const statusApi = createApi({
  reducerPath: 'statusApi',
  baseQuery: fetchBaseQuery(
    { baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ['status'], // 
  endpoints: (builder) => ({
    getStatus: builder.query<statusSchema[], void>({
      query: () => '/api/status',
      providesTags: ['status'], // 
    }),
  }),
});

export const {
  useGetStatusQuery

} = statusApi;
