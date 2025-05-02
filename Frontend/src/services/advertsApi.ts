import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  NewAdvertResponse,
  Advert,
  FilterAdverts,
  listingId,
} from "./schemas/AdvertsSchemas";

export const advertsApi = createApi({
  reducerPath: "advertsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ["Adverts"],
  endpoints: (builder) => ({
    newAdvert: builder.mutation<NewAdvertResponse, { formData: FormData }>({
      query: ({ formData }) => ({
        url: "/api/adverts",
        credentials: "include",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Adverts"],
    }),
    editAdvert: builder.mutation<
      NewAdvertResponse,
      { formData: FormData; id: string }
    >({
      query: ({ formData, id }) => ({
        url: `/api/adverts/${id}`,
        credentials: "include",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Adverts"],
    }),
    deleteAdvert: builder.mutation<{ message: string }, { id: string }>({
      query: ({ id }) => ({
        url: `/api/adverts/${id}`,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }),
      invalidatesTags: ["Adverts"],
    }),
    getAllAdverts: builder.query<
      { adverts: Advert[]; total: string },
      FilterAdverts
    >({
      query: (filters) => ({
        url: `/api/adverts`,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        params: filters,
      }),
      providesTags: [{ type: "Adverts", id: "LIST" }]
    }),
    getAdvertDetail: builder.query<Advert, { slug: string }>({
      query: ({ slug }) => ({
        url: `/api/adverts/${slug}`,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }),
      providesTags: [{ type: "Adverts", id: "LIST" }]

    }),
    getAdvertDetailById: builder.query<Advert, { id: string }>({
      query: ({ id }) => ({
        url: `/api/adverts/${id}/id`,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }),
      providesTags: [{ type: "Adverts", id: "LIST" }]

    }),
    filterAdverts: builder.query<
      { adverts: Advert[]; total: string },
      FilterAdverts
    >({
      query: (filters) => ({
        url: `/api/adverts/search`,
        params: filters,
        method: "GET",
      }),
      providesTags: [{ type: "Adverts", id: "LIST" }]
    }),
    updateAdvertStatus: builder.mutation<
      { message: string },
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `/api/adverts/${id}/status`,
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: { status },
      }),
      invalidatesTags: [{ type: "Adverts", id: "LIST" }]
    }),
     setAdvertFav: builder.mutation<{message: string }, listingId>({
            query: (listingId) => ({
              url: `/api/users/me/favorites/${listingId}`,
              method: "POST",
              credentials:"include",
      
            }),
            invalidatesTags: [{ type: "Adverts", id: "LIST" }],
          }),
          removeAdvertFav: builder.mutation<{message: string },listingId >({
            query: (listingId) => ({
              url: `/api/users/me/favorites/${listingId}`,
              method: "DELETE",
              credentials:"include",       
      
            }),
            invalidatesTags: [{ type: "Adverts", id: "LIST" }],
    
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
    useRemoveAdvertFavMutation,
    useSetAdvertFavMutation,
  useLazyFilterAdvertsQuery,
  useGetAdvertDetailByIdQuery,
  useUpdateAdvertStatusMutation,
} = advertsApi;
