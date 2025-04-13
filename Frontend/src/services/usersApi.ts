import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { User } from "./schemas/UserSchemas";

export const userApi = createApi({
    reducerPath:"userApi",
    baseQuery:fetchBaseQuery({
        baseUrl:import.meta.env.VITE_API_URL
    }),
    endpoints:(builder) => ({
      getMe: builder.query<User, { token: string }>({
        query: ({ token}) => ({
          url: `/api/users/me`,
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          method: "GET"
        })
      }),
      editMe: builder.mutation<User, { token: string, data:User }>({
        query: ({ token,data}) => ({
          url: `/api/users/me`,
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          method: "PUT",
          body:data
        })
      }),
      deleteMe: builder.mutation<User, { token: string }>({
        query: ({ token}) => ({
          url: `/api/users/me`,
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          method: "DELETE"
        })
      }),
    })
})

export const {useGetMeQuery,useDeleteMeMutation, useEditMeMutation} = userApi
