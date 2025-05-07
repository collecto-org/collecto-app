import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ConditionSchema } from './schemas/UniverseSchemas';

export const conditionsApi = createApi({
  reducerPath: 'conditionsApi',
  baseQuery: fetchBaseQuery(
    { baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ['conditions'], // 
  endpoints: (builder) => ({
    getConditions: builder.query<ConditionSchema[], void>({
      query: () => '/conditions',
      providesTags: ['conditions'], // 
    }),
        updateConditions: builder.mutation<
          ConditionSchema,
          { id: string; data: Partial<ConditionSchema> }
        >({
          query: ({ id, data }) => ({
            url: `/conditions/${id}`,
            method: "PUT",
            credentials: "include",
            body: data,
          }),
          invalidatesTags: ["conditions"],
        }),
        postConditions: builder.mutation<ConditionSchema, ConditionSchema>({
          query: (data) => ({
            url: `/conditions`,
            method: "POST",
            credentials: "include",
            body: data,
          }),
          invalidatesTags: ["conditions"],
        }),
        deleteConditions: builder.mutation<ConditionSchema, { id: string }>({
          query: ({ id }) => ({
            url: `/conditions/${id}`,
            method: "DELETE",
            credentials: "include",
          }),
          invalidatesTags: ["conditions"],
        }),
  }),
});

export const {
  useGetConditionsQuery,
  useDeleteConditionsMutation,
  usePostConditionsMutation,
  useUpdateConditionsMutation,
} = conditionsApi;
