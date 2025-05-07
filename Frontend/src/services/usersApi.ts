import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { Chat,  User } from "./schemas/UserSchemas";



export const userApi = createApi({
    reducerPath:"userApi",
    baseQuery:fetchBaseQuery({
        baseUrl:import.meta.env.VITE_API_URL
    }),
    tagTypes: ['Adverts'],
    endpoints:(builder) => ({
      getMe: builder.query<User, {}>({
        query: () => ({
          url: `/users/me`,
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          method: "GET"
        })
      }),
      editMe: builder.mutation<User, {  formData: FormData  }>({
        query: ({formData}) => ({
          url: `/users/me`,
          credentials: "include",
          method: "PUT",
          body:formData
        })
      }),
      deleteMe: builder.mutation<User, {password:string }>({
        query: ({ password }) => ({
          url: `/users/me`,
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          method: "DELETE",
          body: { password },
        })
      }),

     
      getChats: builder.query<Chat[],void >({
        query: () => ({
          url: `/users/me/chat`,
          method: "GET",
          credentials:"include",
          
  
        }),
      }),

      checkEmailExists: builder.mutation<{ exists: boolean }, { email: string }>({
        query: ({ email }) => ({
          url: `/users/me/check-email`,
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: { email },
        }),
      }),
      updatePassword: builder.mutation<{ message: string }, { currentPassword: string; newPassword: string }>({
      query: (data) => ({
        url: '/users/me/password',
        method: 'PATCH',
        credentials:"include",
        body: data,
      }),
    }),
         
    })
})

export const {
  useGetMeQuery,
  useLazyGetMeQuery,
  useDeleteMeMutation, 
  useEditMeMutation,

  useGetChatsQuery,
  useCheckEmailExistsMutation,
  useUpdatePasswordMutation,

} = userApi
