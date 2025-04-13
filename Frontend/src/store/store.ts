import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import advertsReducer from "./slices/advertsSlice";
import userReducer from "./slices/userSlice";
import { authApi } from "../services/authApi";
import { advertsApi } from "../services/advertsApi";
import { userApi } from "../services/usersApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        adverts: advertsReducer,
        user:userReducer,
        [authApi.reducerPath]: authApi.reducer,
        [advertsApi.reducerPath]: advertsApi.reducer,
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware).concat(advertsApi.middleware).concat(userApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;