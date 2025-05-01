import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CatalogSchema } from "./schemas/UniverseSchemas";


export const catalogsApi = createApi({
  reducerPath: "catalogsApi ",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({

    getCatalogs: builder.query<CatalogSchema, void>({
      query: () => ({
        url: `/api/catalogs`,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }),
    }),
    
  }),
});

export const {
  useGetCatalogsQuery
} = catalogsApi;

