import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BrandSchema } from './schemas/UniverseSchemas';

export const brandsApi = createApi({
  reducerPath: 'brandsApi',
  baseQuery: fetchBaseQuery(
    { baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ['Brands'], // 
  endpoints: (builder) => ({
    getBrands: builder.query<BrandSchema[], void>({
      query: () => '/api/brands',
      providesTags: ['Brands'], // 
    }),
        updateBrands: builder.mutation<
          BrandSchema,
          { id: string; data: Partial<BrandSchema> }
        >({
          query: ({ id, data }) => ({
            url: `/api/brands/${id}`,
            method: "PUT",
            credentials: "include",
            body: data,
          }),
          invalidatesTags: ["Brands"],
        }),
        postBrands: builder.mutation<BrandSchema, BrandSchema>({
          query: (data) => ({
            url: `/api/brands`,
            method: "POST",
            credentials: "include",
            body: data,
          }),
          invalidatesTags: ["Brands"],
        }),
        deleteBrands: builder.mutation<BrandSchema, { id: string }>({
          query: ({ id }) => ({
            url: `/api/brands/${id}`,
            method: "DELETE",
            credentials: "include",
          }),
          invalidatesTags: ["Brands"],
        }),
  }),
});

export const {
  useGetBrandsQuery,
  useDeleteBrandsMutation,
  usePostBrandsMutation,
  useUpdateBrandsMutation,
} = brandsApi;
