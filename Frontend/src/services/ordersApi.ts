import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AdvertId } from "./schemas/AdvertsSchemas";
import {
  DeleteOrder,
  NewOrder,
  Order,
  OrderId,
  UpdateOrder,

} from "./schemas/OrderSchemas";

export const ordersApi = createApi({
  reducerPath: "ordersApi ",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    getMyOrders: builder.query<Order[], {}>({
      query: () => ({
        url: `/api/users/me/notifications/favorite-status-change`,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }),
    }),
    getOrder: builder.query<Order, OrderId>({
      query: (_id) => ({
        url: `/api/orders/${_id}/status`,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }),
    }),
    newOrder: builder.mutation<NewOrder, AdvertId>({
      query: (advertId) => ({
        url: `/api/users/me/notifications/favorite-status-change`,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: advertId,
        method: "POST",
      }),
    }),
    changeStatusOrder: builder.mutation<Order, UpdateOrder>({
      query: ({ _id, status }) => ({
        url: `/api/orders/${_id}/status`,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: status,
      }),
    }),
    deleteOrder: builder.mutation<DeleteOrder, OrderId>({
      query: (_id) => ({
        url: `/api/orders/${_id}`,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetMyOrdersQuery,
  useNewOrderMutation,
  useChangeStatusOrderMutation,
  useDeleteOrderMutation,
  useGetOrderQuery,
} = ordersApi;

