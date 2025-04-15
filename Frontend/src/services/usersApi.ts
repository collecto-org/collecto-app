import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { User } from "./schemas/UserSchemas";

export const userApi = createApi({
    reducerPath:"userApi",
    baseQuery:fetchBaseQuery({
        baseUrl:import.meta.env.VITE_API_URL
    }),
    endpoints:(builder) => ({
      getMe: builder.query<User, { token: string }>({
        query: () => ({
          url: `/api/users/me`,
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          method: "GET"
        })
      }),
      editMe: builder.mutation<User, { data:User }>({
        query: ({data}) => ({
          url: `/api/users/me`,
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          method: "PUT",
          body:data
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
    })
})

export const {useGetMeQuery,useDeleteMeMutation, useEditMeMutation} = userApi
