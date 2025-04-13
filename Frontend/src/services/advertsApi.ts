import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {  NewAdvertResponse, EditAdvertInput, Advert, FilterAdverts } from "./schemas/AdvertsSchemas";

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
    editAdvert: builder.mutation<NewAdvertResponse, EditAdvertInput>({
      query: ({ data, token, id }) => ({
        url: `/api/adverts/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "PUT",
        params: data,
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
    getAllAdverts: builder.query<Advert[], void>({
      query: () => ({
        url: `/api/adverts`,
        method: "GET",
      }),
    }),
    getAdvertDetail: builder.query<Advert, { slug: string }>({
      query: ({ slug }) => ({
        url: `/api/adverts/${slug}`,
        method: "GET",
      }),
    }),
    filterAdverts: builder.query<{ adverts: Advert[] }, { filters: FilterAdverts }>({
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
