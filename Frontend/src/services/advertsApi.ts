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
        url: "/adverts",
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
        url: `/adverts/${id}`,
        credentials: "include",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Adverts"],
    }),
    deleteAdvert: builder.mutation<{ message: string }, { id: string }>({
      query: ({ id }) => ({
        url: `/adverts/${id}`,
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
        url: `/adverts`,
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
        url: `/adverts/${slug}`,
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
        url: `/adverts/${id}/id`,
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
        url: `/adverts/search`,
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
        url: `/adverts/${id}/status`,
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
              url: `/users/me/favorites/${listingId}`,
              method: "POST",
              credentials:"include",
      
            }),
            invalidatesTags: [{ type: "Adverts", id: "LIST" }],
          }),
          removeAdvertFav: builder.mutation<{message: string },listingId >({
            query: (listingId) => ({
              url: `/users/me/favorites/${listingId}`,
              method: "DELETE",
              credentials:"include",       
      
            }),
            invalidatesTags: [{ type: "Adverts", id: "LIST" }],
    
          }),
                getMyadverts: builder.query<{adverts:Advert[]; total:string},FilterAdverts>({
                  query: (filters) => ({
                    url: `/users/me/adverts`,
                    method: "GET",
                    credentials:"include",
                    params:filters
            
                  }),
                  providesTags: [{ type: "Adverts", id: "LIST" }]

                  
                }),
                getMyFavAdverts: builder.query<{adverts:Advert[]; total:string},FilterAdverts>({
                  query: (filters) => ({
                    url: `/users/me/favorites`,
                    method: "GET",
                    credentials:"include",
                    params:filters
            
                  }),
                  providesTags: [{ type: "Adverts", id: "LIST" }]

                }),
                getUserAdverts: builder.query<{adverts:Advert[]; total:string},{username:string,filters:FilterAdverts} >({
                  query: ({username,filters}) => ({
                    url: `/users/${username}/listings`,
                    method: "GET",
                    credentials:"include",
                    params:filters
                    
            
                  }),
                  providesTags: [{ type: "Adverts", id: "LIST" }]

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
  useGetMyadvertsQuery,
  useGetUserAdvertsQuery,
  useGetMyFavAdvertsQuery,
} = advertsApi;
