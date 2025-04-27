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
        updateTransactions: builder.mutation<
          TransactionSchema,
          { id: string; data: Partial<TransactionSchema> }
        >({
          query: ({ id, data }) => ({
            url: `/api/transactions/${id}`,
            method: "PUT",
            credentials: "include",
            body: data,
          }),
          invalidatesTags: ["transactions"],
        }),
        postTransactions: builder.mutation<TransactionSchema, TransactionSchema>({
          query: (data) => ({
            url: `/api/transactions`,
            method: "POST",
            credentials: "include",
            body: data,
          }),
          invalidatesTags: ["transactions"],
        }),
        deleteTransactions: builder.mutation<TransactionSchema, { id: string }>({
          query: ({ id }) => ({
            url: `/api/transactions/${id}`,
            method: "DELETE",
            credentials: "include",
          }),
          invalidatesTags: ["transactions"],
        }),
  }),
});

export const {
  useGetTransactionsQuery,
  useDeleteTransactionsMutation,
  usePostTransactionsMutation,
  useUpdateTransactionsMutation,

} = transactionsApi;
