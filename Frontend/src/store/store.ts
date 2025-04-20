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
import { paymentsApi } from "@/services/paymentsApi";
import { shipmentsApi } from "@/services/shipmentsApi";
import { universesApi } from "@/services/universesApi";
import { brandsApi } from "@/services/brandsApi";
import { collectionsApi } from "@/services/collectionsApi";
import { productTypesApi } from "@/services/productTypesApi";
import { conditionsApi } from "@/services/conditionsApi";
import { shippingMethodsApi } from "@/services/shipmentMethodsApi";


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
        [paymentsApi.reducerPath]:paymentsApi.reducer,
        [shipmentsApi.reducerPath]:shipmentsApi.reducer,
        [universesApi.reducerPath]:universesApi.reducer,
        [brandsApi.reducerPath]:brandsApi.reducer,
        [collectionsApi.reducerPath]:collectionsApi.reducer,
        [productTypesApi.reducerPath]:productTypesApi.reducer,
        [conditionsApi.reducerPath]:conditionsApi.reducer,
        [shippingMethodsApi.reducerPath]:shippingMethodsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
    .concat(authApi.middleware)
    .concat(advertsApi.middleware)
    .concat(userApi.middleware)
    .concat(notificationApi.middleware)
    .concat(ordersApi.middleware)
    .concat(paymentsApi.middleware)
    .concat(shipmentsApi.middleware)
    .concat(universesApi.middleware)
    .concat(brandsApi.middleware)
    .concat(collectionsApi.middleware)
    .concat(productTypesApi.middleware)
    .concat(shippingMethodsApi.middleware)

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;