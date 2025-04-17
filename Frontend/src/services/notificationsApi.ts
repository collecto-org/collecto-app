import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { FavoritePriceChange, FavoriteRemove, FavoriteStatusChange, NewChatMessage, NotificationSchema } from "./schemas/NotificationSchema";

export const notificationApi = createApi({
    reducerPath:"notificationsApi",
    baseQuery:fetchBaseQuery({
        baseUrl:import.meta.env.VITE_API_URL
    }),
    endpoints:(builder) => ({
      statusChange: builder.mutation<{message:string}, FavoriteStatusChange>({
        query: (notificationValues) => ({
          url: `/api/users/me/notifications/favorite-status-change`,
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body:notificationValues,
          method: "POST"
        })
      }),
      getNotifications: builder.query<NotificationSchema[], {}>({
        query: () => ({
          url: `/api/users/me/notifications`,
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          method: "GET"
        })
      }),
      readNotifications: builder.mutation<{message:string}, string>({
        query: (id) => ({
          url: `/api/users/me/notifications/${id}/read`,
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          method: "PATCH"
        })
      }),
      priceChange: builder.mutation<{message:string}, FavoritePriceChange>({
        query: (notificationValues) => ({
          url: `/api/users/me/notifications/favorite-price-change`,
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body:notificationValues,
          method: "POST"
        })
      }),
      removeFav: builder.mutation<{message:string}, FavoriteRemove>({
        query: (notificationValues) => ({
          url: `/api/users/me/notifications/favorite-removed`,
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body:notificationValues,
          method: "POST"
        })
      }),
      newChatMessage: builder.mutation<{message:string}, NewChatMessage>({
        query: (notificationValues) => ({
          url: `/api/users/me/notifications/favorite-removed`,
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body:notificationValues,
          method: "POST"
        })
      }),
    })
})

export const {
useStatusChangeMutation,
useGetNotificationsQuery,
useReadNotificationsMutation,
usePriceChangeMutation,
useRemoveFavMutation,
useNewChatMessageMutation,

} = notificationApi
