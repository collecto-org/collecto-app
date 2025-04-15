import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {  NewAdvertResponse,  Advert, FilterAdverts } from "./schemas/AdvertsSchemas";

export const advertsApi = createApi({
  reducerPath: "advertsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    newAdvert: builder.mutation<NewAdvertResponse, { token: string; formData: FormData }>({
      query: ({ formData, token }) => ({
        url: "/api/adverts",
        headers: {
          Authorization: `Bearer ${token}`,          
        },
        method: "POST",
        body: formData,
      }),
    }),
    editAdvert: builder.mutation<NewAdvertResponse, { token: string; formData: FormData; slug:string }>({
      query: ({ formData, token,slug }) => ({
        url: `/api/adverts/${slug}`,
        headers: {
          Authorization: `Bearer ${token}`,          
        },
        method: "PUT",
        body: formData,
      }),
    }),
    deleteAdvert: builder.mutation<{ message: string }, { token: string; id: string }>({
      query: ({ token, id }) => ({
        url: `/api/adverts/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }),
    }),
    getAllAdverts: builder.query<Advert[],  FilterAdverts >({
      query: (filters) => ({
        url: `/api/adverts`,
        method: "GET",
        params:filters

      }),
    }),
    getAdvertDetail: builder.query<Advert, { slug: string }>({
      query: ({ slug }) => ({
        url: `/api/adverts/${slug}`,
        method: "GET",
      }),
    }),
    filterAdverts: builder.query<Advert[],  FilterAdverts >({
      query: (filters) => ({
        url: `/api/adverts`,
        params: filters,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useNewAdvertMutation,
  useEditAdvertMutation,
  useDeleteAdvertMutation,
  useGetAllAdvertsQuery,
  useGetAdvertDetailQuery,
  useFilterAdvertsQuery,
} = advertsApi;
