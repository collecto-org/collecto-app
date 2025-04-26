import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ShippingMethodSchema } from "./schemas/UniverseSchemas";

export const shippingMethodsApi = createApi({
  reducerPath: "shippingMethodsApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ["shippingMethods"], //
  endpoints: (builder) => ({
    getshippingMethods: builder.query<ShippingMethodSchema[], void>({
      query: () => "/api/shippingMethods",
      providesTags: ["shippingMethods"],
    }),
    updateShippingMethods: builder.mutation<
      ShippingMethodSchema,
      { id: string; data: Partial<ShippingMethodSchema> }>({
      query: ({ id, data }) => ({
        url: `/api/shippingMethods/${id}`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["shippingMethods"],
    }),
    postShippingMethods: builder.mutation<ShippingMethodSchema,  ShippingMethodSchema >({
      query: (data) => ({
        url: `/api/shippingMethods`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["shippingMethods"],
    }),
    deleteShippingMethods: builder.mutation<ShippingMethodSchema,{ id: string }  >({
      query: ({ id }) => ({
        url: `/api/shippingMethods/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["shippingMethods"],
    }),
  }),
});

export const { useGetshippingMethodsQuery,
                useDeleteShippingMethodsMutation,
                usePostShippingMethodsMutation,
                useUpdateShippingMethodsMutation,
 } = shippingMethodsApi;
