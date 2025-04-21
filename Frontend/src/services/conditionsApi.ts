import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ConditionSchema } from './schemas/UniverseSchemas';

export const conditionsApi = createApi({
  reducerPath: 'conditionsApi',
  baseQuery: fetchBaseQuery(
    { baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ['conditions'], // 
  endpoints: (builder) => ({
    getConditions: builder.query<ConditionSchema[], void>({
      query: () => '/api/conditions',
      providesTags: ['conditions'], // 
    }),
  }),
});

export const {
  useGetConditionsQuery

} = conditionsApi;
