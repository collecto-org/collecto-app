import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ShippingMethodSchema } from './schemas/UniverseSchemas';

export const shippingMethodsApi = createApi({
  reducerPath: 'shippingMethodsApi',
  baseQuery: fetchBaseQuery(
    { baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ['shippingMethods'], // 
  endpoints: (builder) => ({
    getshippingMethods: builder.query<ShippingMethodSchema[], void>({
      query: () => '/api/shippingMethods',
      providesTags: ['shippingMethods'], // 
    }),
  }),
});

export const {
  useGetshippingMethodsQuery

} = shippingMethodsApi;
