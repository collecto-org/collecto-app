import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TransactionSchema } from './schemas/UniverseSchemas';

export const transactionsApi = createApi({
  reducerPath: 'transactionsApi',
  baseQuery: fetchBaseQuery(
    { baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ['transactions'], // 
  endpoints: (builder) => ({
    getTransactions: builder.query<TransactionSchema[], void>({
      query: () => '/api/transactions',
      providesTags: ['transactions'], // 
    }),
  }),
});

export const {
  useGetTransactionsQuery

} = transactionsApi;
