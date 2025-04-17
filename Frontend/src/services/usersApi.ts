import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { User } from "./schemas/UserSchemas";
import { Advert, FilterAdverts, listingId } from "./schemas/AdvertsSchemas";



export const userApi = createApi({
    reducerPath:"userApi",
    baseQuery:fetchBaseQuery({
        baseUrl:import.meta.env.VITE_API_URL
    }),
    endpoints:(builder) => ({
      getMe: builder.query<User, {}>({
        query: () => ({
          url: `/api/users/me`,
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          method: "GET"
        })
      }),
      editMe: builder.mutation<User, {  formData: FormData  }>({
        query: ({formData}) => ({
          url: `/api/users/me`,
          credentials: "include",
          method: "PUT",
          body:formData
        })
      }),
      deleteMe: builder.mutation<User, { }>({
        query: () => ({
          url: `/api/users/me`,
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          method: "DELETE"
        })
      }),
      getMyadverts: builder.query<{adverts:Advert[]; total:string},FilterAdverts>({
        query: (filters) => ({
          url: `/api/users/me/adverts`,
          method: "GET",
          credentials:"include",
          params:filters
  
        }),
      }),
      getMyFavAdverts: builder.query<{adverts:Advert[]; total:string},FilterAdverts>({
        query: (filters) => ({
          url: `/api/users/me/favorites`,
          method: "GET",
          credentials:"include",
          params:filters
  
        }),
      }),
      setAdvertFav: builder.mutation<{message: string }, listingId>({
        query: (listingId) => ({
          url: `/api/users/me/favorites/${listingId}`,
          method: "POST",
          credentials:"include",
  
        }),
      }),
      removeAdvertFav: builder.mutation<{message: string },listingId >({
        query: (listingId) => ({
          url: `/api/users/me/favorites/${listingId}`,
          method: "DELETE",
          credentials:"include",
          
  
        }),
      }),
    })
})

export const {
  useGetMeQuery,
  useDeleteMeMutation, 
  useEditMeMutation,
  useGetMyadvertsQuery,
  useRemoveAdvertFavMutation,
  useGetMyFavAdvertsQuery,
useSetAdvertFavMutation} = userApi
