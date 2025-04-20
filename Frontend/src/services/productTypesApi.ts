import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProductTypeSchema } from './schemas/UniverseSchemas';

export const productTypesApi = createApi({
  reducerPath: 'productTypesAPI',
  baseQuery: fetchBaseQuery(
    { baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ['product-types'], // 
  endpoints: (builder) => ({
    getProductTypes: builder.query<ProductTypeSchema[], void>({
      query: () => '/api/product-types',
      providesTags: ['product-types'], // 
    }),
  }),
});

export const {
  useGetProductTypesQuery

} = productTypesApi;
