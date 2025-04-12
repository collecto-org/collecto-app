import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { User } from "./schemas/UserSchemas";

export const authApi = createApi({
    reducerPath:"userApi",
    baseQuery:fetchBaseQuery({
        baseUrl:import.meta.env.VITE_API_URL
    }),
    endpoints:(builder) => ({
      getMe: builder.mutation<{
        user:User;
      }, { token: string }>({
        query: ({ token}) => ({
          url: `/api/auth/reset/${token}`,
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          method: "GET"
        })
      }),
    })
})

export const {useGetMeMutation } = authApi
