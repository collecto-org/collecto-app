import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath:"authApi",
    baseQuery:fetchBaseQuery({
        baseUrl:import.meta.env.VITE_API_URL
    }),
    endpoints:(builder) => ({
        login:builder.mutation<{token:string},{username:string; password:string; rememberMe:boolean}>({
            query:(credentials) => ({
                url:"/api/auth/login",
                method:"POST",
                body:credentials
            })
        })
    })
})

export const { useLoginMutation } = authApi
