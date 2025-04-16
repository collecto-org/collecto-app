import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {  NewAdvertResponse,  Advert, FilterAdverts } from "./schemas/AdvertsSchemas";

export const advertsApi = createApi({
  reducerPath: "advertsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    newAdvert: builder.mutation<NewAdvertResponse, { formData: FormData }>({
      query: ({ formData }) => ({
        url: "/api/adverts",
        credentials: "include",
        method: "POST",
        body: formData,
      }),
    }),
    editAdvert: builder.mutation<NewAdvertResponse, { formData: FormData; id:string }>({
      query: ({ formData, id }) => ({
        url: `/api/adverts/${id}`,
        credentials: "include",
        method: "PUT",
        body: formData,
      }),
    }),
    deleteAdvert: builder.mutation<{ message: string }, { id: string }>({
      query: ({ id }) => ({
        url: `/api/adverts/${id}`,
        credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
        method: "DELETE",
      }),
    }),
    getAllAdverts: builder.query<{adverts:Advert[]; total:string},  FilterAdverts >({
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
