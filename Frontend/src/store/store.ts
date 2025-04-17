import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import advertsReducer from "./slices/advertsSlice";
import userReducer from "./slices/userSlice";
import notificationReducer from "./slices/notificationSlice";
import { authApi } from "../services/authApi";
import { advertsApi } from "../services/advertsApi";
import { userApi } from "../services/usersApi";
import { notificationApi } from "@/services/notificationsApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        adverts: advertsReducer,
        user:userReducer,
        notifications:notificationReducer,
        [authApi.reducerPath]: authApi.reducer,
        [advertsApi.reducerPath]: advertsApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [notificationApi.reducerPath]:notificationApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
    .concat(authApi.middleware)
    .concat(advertsApi.middleware)
    .concat(userApi.middleware)
    .concat(notificationApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;