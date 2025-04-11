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
                url:"/api/auth/register",
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
              url: `/api/auth/verify-email/${token}`,
              method: "POST"
            })
          }),
          recoverPass: builder.mutation<{
            message: string;
          }, { email: string }>({
            query:(credentials) => ({
              url:"/api/auth/recover",
              method:"POST",
              body:credentials
          })
          }),
          verifyPasswordToken: builder.mutation<{
            message:string;
          }, { token: string }>({
            query: ({ token }) => ({
              url: `/api/auth/recover/${token}`,
              method: "POST"
            })
          }),
          changePassword: builder.mutation<{
            message:string;
          }, { token: string, data:{newPassword:string} }>({
            query: ({ token,data }) => ({
              url: `/api/auth/reset/${token}`,
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
             useRegisterMutation,
             useVerifyMutation,
             useRecoverPassMutation,
            useVerifyPasswordTokenMutation,
          useChangePasswordMutation,} = authApi
