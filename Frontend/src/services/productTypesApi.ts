import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductTypeSchema } from "./schemas/UniverseSchemas";

export const productTypesApi = createApi({
  reducerPath: "productTypesAPI",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ["product-types"], //
  endpoints: (builder) => ({
    getProductTypes: builder.query<ProductTypeSchema[], void>({
      query: () => "/product-types",
      providesTags: ["product-types"], //
    }),
    updateProductTypes: builder.mutation<
      ProductTypeSchema,
      { id: string; data: Partial<ProductTypeSchema> }
    >({
      query: ({ id, data }) => ({
        url: `/product-types/${id}`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["product-types"],
    }),
    postProductTypes: builder.mutation<ProductTypeSchema, ProductTypeSchema>({
      query: (data) => ({
        url: `/product-types`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["product-types"],
    }),
    deleteProductTypes: builder.mutation<ProductTypeSchema, { id: string }>({
      query: ({ id }) => ({
        url: `/product-types/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["product-types"],
    }),
  }),
});

export const { useGetProductTypesQuery,
                useDeleteProductTypesMutation,
                usePostProductTypesMutation,
                useUpdateProductTypesMutation,
 } = productTypesApi;
