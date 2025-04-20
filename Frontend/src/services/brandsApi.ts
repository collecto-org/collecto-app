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
  }),
});

export const {
  useGetBrandsQuery

} = brandsApi;
