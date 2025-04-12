import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { NewAdvertInput, NewAdvertResponse, EditAdvertInput, Advert, FilterAdverts } from "./schemas/AdvertsSchemas";



export const advertsApi = createApi({
    reducerPath:"advertsApi",
    baseQuery:fetchBaseQuery({
        baseUrl:import.meta.env.VITE_API_URL
    }),
    endpoints:(builder) => ({
        newAdvert:builder.mutation<NewAdvertResponse,NewAdvertInput>({
            query:({data,token}) => ({
                url:"/api/adverts",
                headers: {
                  "Authorization": `Bearer ${token}`,
                  "Content-Type": "application/json"
                },
                method:"POST",
                body:data
            })
        }),
        editAdvert:builder.mutation<NewAdvertResponse,EditAdvertInput>({
          query:({data,token,id}) => ({
              url:`/api/adverts/${id}`,
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
              },
              method:"PUT",
              params:data
          })
      }),
      deleteAdvert:builder.mutation<{message:string;},{token:string; id:string;}>({
        query:({token,id}) => ({
            url:`/api/adverts/${id}`,
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            method:"DELETE",
        })
    }),
    getAllAdverts:builder.mutation<{adverts:[Advert];},{}>({
      query:() => ({
          url:`/api/adverts`,
          method:"GET",
      })
  }),
  getAdvertDetail:builder.mutation<{adverts:[Advert];},{slug:string}>({
    query:(slug) => ({
        url:`/api/adverts/${slug}`,
        method:"GET",
    })
}),
filterAdverts:builder.mutation<{adverts:[Advert];},{filters:FilterAdverts}>({
  query:(filters) => ({
      url:`/api/adverts/${filters}`,
      method:"GET",
  })
}),

    })
})

export const { 
  useNewAdvertMutation,
  useEditAdvertMutation,
  useDeleteAdvertMutation,
  useGetAllAdvertsMutation,
  useGetAdvertDetailMutation

  
             } = advertsApi
