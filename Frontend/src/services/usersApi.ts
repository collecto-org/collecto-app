import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { GetChatsResponse, User } from "./schemas/UserSchemas";
import { Advert, FilterAdverts, listingId, Username } from "./schemas/AdvertsSchemas";



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
      getChats: builder.query<GetChatsResponse,void >({
        query: () => ({
          url: `/api/users/chats`,
          method: "GET",
          credentials:"include",
          
  
        }),
      }),
      getUserAdverts: builder.query<{adverts:Advert[]; total:string},{username:string,filters:FilterAdverts} >({
        query: ({username,filters}) => ({
          url: `/api/users/${username}/listings`,
          method: "GET",
          credentials:"include",
          params:filters
          
  
        }),
      }),
      checkEmailExists: builder.mutation<{ exists: boolean }, { email: string }>({
        query: ({ email }) => ({
          url: `/api/users/me/check-email`,
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: { email },
        }),
      }),      
    })
})

export const {
  useGetMeQuery,
  useLazyGetMeQuery,
  useDeleteMeMutation, 
  useEditMeMutation,
  useGetMyadvertsQuery,
  useRemoveAdvertFavMutation,
  useGetMyFavAdvertsQuery,
useSetAdvertFavMutation,
useGetChatsQuery,
useGetUserAdvertsQuery,
useCheckEmailExistsMutation,

} = userApi
