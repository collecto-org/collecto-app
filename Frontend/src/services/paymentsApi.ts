import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { CreatePaymentSchema, PaymentConfirmationSchema, PaymentSchema } from "./schemas/paymentsSchemas";

export const paymentsApi = createApi({
  reducerPath: "paymentsApi ",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    getMySales: builder.query<PaymentSchema[], any>({
      query: () => ({
        url: `/api/payments/my-sales`,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }),
    }),
    getMyPurchases: builder.query<PaymentSchema[], any>({
      query: () => ({
        url: `/api/payments/my-purchases`,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }),
    }),
    getPayment: builder.query<PaymentSchema[], {id:string}>({
      query: (id) => ({
        url: `/api/payments/${id}`,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }),
    }),
    getPaymentStatus: builder.query<PaymentSchema[], {paymentId:string}>({
      query: (paymentId) => ({
        url: `/api/payments/status/${paymentId}`,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }),
    }),
    createPayment: builder.mutation<PaymentSchema, CreatePaymentSchema>({
      query: (payment) => ({
        url: `/api/payments`,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body:payment,
        method: "POST",
      }),
    }),
    confirmPayment: builder.mutation<PaymentSchema, PaymentConfirmationSchema>({
      query: (payment) => ({
        url: `/api/payments`,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body:payment,
        method: "POST",
      }),
    }),
    
  }),
});

export const {

  useGetMyPurchasesQuery,
  useGetMySalesQuery,
  useGetPaymentQuery,
  useConfirmPaymentMutation,
  useCreatePaymentMutation,
  useGetPaymentStatusQuery


} = paymentsApi;

