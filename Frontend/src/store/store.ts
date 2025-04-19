import { configureStore } from "@reduxjs/toolkit";
import advertsReducer from "./slices/advertsSlice";
import userReducer from "./slices/userSlice";
import ordersReducer from "./slices/ordersSlice";
import notificationReducer from "./slices/notificationSlice";
import { authApi } from "../services/authApi";
import { advertsApi } from "../services/advertsApi";
import { userApi } from "../services/usersApi";
import { notificationApi } from "@/services/notificationsApi";
import { ordersApi } from "@/services/ordersApi";

export const store = configureStore({
    reducer: {

        adverts: advertsReducer,
        user:userReducer,
        notifications:notificationReducer,
        orders:ordersReducer,
        [authApi.reducerPath]: authApi.reducer,
        [advertsApi.reducerPath]: advertsApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [notificationApi.reducerPath]:notificationApi.reducer,
        [ordersApi.reducerPath]:ordersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
    .concat(authApi.middleware)
    .concat(advertsApi.middleware)
    .concat(userApi.middleware)
    .concat(notificationApi.middleware)
    .concat(ordersApi.middleware)

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;