import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { LoginResponse, LoginSchema } from "./schemas/AuthSchemas";

export const authApi = createApi({
    reducerPath:"authApi",
    baseQuery:fetchBaseQuery({
        baseUrl:import.meta.env.VITE_API_URL
    }),
    endpoints:(builder) => ({
        login:builder.mutation<LoginResponse ,LoginSchema>({
            query:(credentials) => ({
                url:"/auth/login",
                method:"POST",
                body:credentials,
                credentials: "include",
                
            })
        }),
        logout:builder.mutation<{message:string;} ,void>({
          query:() => ({
              url:"/auth/logout",
              method:"POST",
              credentials: "include",
              
          })
      }),
        register:builder.mutation<{
            message: string,
            user: {
              id: string,
              username: string,
              email: string,
            }
          },{username:string; 
            password:string; 
            firstName:string; 
            lastName:string}>({
            query:(credentials) => ({
                url:"/auth/register",
                method:"POST",
                body:credentials
            })
        }),
        verify: builder.mutation<{
            user: {
              username: string;
              id: string;
              email: string;
            };
          }, { token: string }>({
            query: ({ token }) => ({
              url: `/auth/verify-email/${token}`,
              method: "POST"
            })
          }),
          recoverPass: builder.mutation<{
            message: string;
          }, { email: string }>({
            query:(credentials) => ({
              url:"/auth/recover",
              method:"POST",
              body:credentials
          })
          }),
          verifyPasswordToken: builder.mutation<{
            message:string;
          }, { token: string }>({
            query: ({ token }) => ({
              url: `/auth/recover/${token}`,
              method: "POST"
            })
          }),
          changePassword: builder.mutation<{
            message:string;
          }, { token: string, data:{newPassword:string} }>({
            query: ({ token,data }) => ({
              url: `/auth/reset/${token}`,
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
              },
              body: data,
              method: "POST"
            })
          }),
    })
})

export const { useLoginMutation,
              useLogoutMutation,
             useRegisterMutation,
             useVerifyMutation,
             useRecoverPassMutation,
            useVerifyPasswordTokenMutation,
          useChangePasswordMutation,} = authApi
