import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { statusSchema } from "./schemas/UniverseSchemas";

export const statusApi = createApi({
  reducerPath: "statusApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ["status"],
  endpoints: (builder) => ({
    getStatus: builder.query<statusSchema[], void>({
      query: () => "/api/status",
      providesTags: ["status"],
    }),
    updateStatus: builder.mutation<
      statusSchema,
      { id: string; data: Partial<statusSchema> }
    >({
      query: ({ id, data }) => ({
        url: `/api/status/${id}`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["status"],
    }),
    postStatus: builder.mutation<statusSchema, statusSchema>({
      query: (data) => ({
        url: `/api/status`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["status"],
    }),
    deleteStatus: builder.mutation<statusSchema, { id: string }>({
      query: ({ id }) => ({
        url: `/api/status/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["status"],
    }),
  }),
});

export const { useGetStatusQuery,
                useDeleteStatusMutation,
                usePostStatusMutation,
                useUpdateStatusMutation
 } = statusApi;
