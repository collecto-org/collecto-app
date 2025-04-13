import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import advertsReducer from "./slices/advertsSlice";
import { authApi } from "../services/authApi";
import { advertsApi } from "../services/advertsApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        adverts: advertsReducer,
        [authApi.reducerPath]: authApi.reducer,
        [advertsApi.reducerPath]: advertsApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware).concat(advertsApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;