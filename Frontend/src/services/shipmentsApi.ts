import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { CreateShipmentResponseSchema, CreateShipmentSchema, ShipmentHistorySchema, ShipmentSchema, ShipmentStatuschema } from "./schemas/shipmentsSchema";

export const shipmentsApi = createApi({
  reducerPath: "shipmentsApi ",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({

    getShipmentHistory: builder.query<ShipmentSchema, {id:string}>({
      query: (id) => ({
        url: `/api/shipments/me/${id}/history`,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }),
    }),
    getShipment: builder.query<ShipmentSchema[], {id:string}>({
      query: (id) => ({
        url: `/api/shipments/me/${id}`,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }),
    }),
    createShipment: builder.mutation<CreateShipmentSchema, CreateShipmentResponseSchema>({
      query: (shipment) => ({
        url: `/api/shipments`,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body:shipment,
        method: "POST",
      }),
    }),
    updateShipmentHistory: builder.mutation<ShipmentHistorySchema, ShipmentSchema>({
      query: (history) => ({
        url: `/api/shipments/history`,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body:history,
        method: "POST",
      }),
    }),
    updateShipmentStatus: builder.mutation<ShipmentHistorySchema, ShipmentStatuschema>({
      query: ({id,status}) => ({
        url: `/api/shipments/me/${id}/status`,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body:status,
        method: "POST",
      }),
    }),
    
  }),
});

export const {
  useCreateShipmentMutation,
  useGetShipmentHistoryQuery,
  useGetShipmentQuery,
  useUpdateShipmentHistoryMutation,
  useUpdateShipmentStatusMutation
} = shipmentsApi;

