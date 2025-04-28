import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GenderSchema } from './schemas/GenderSchema';

export const gendersApi = createApi({
  reducerPath: 'genderApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Genders'],
  endpoints: (builder) => ({
    
    // Traer todos los géneros
    getGenders: builder.query<GenderSchema[], void>({
      query: () => '/genders',
      providesTags: ['Genders'],
    }),

    // Traer un género por ID
    getGenderById: builder.query<GenderSchema, string>({
      query: (id) => `/genders/${id}`,
    }),

    // Crear un nuevo género
    createGender: builder.mutation<GenderSchema, Partial<GenderSchema>>({
      query: (newGender) => ({
        url: '/genders',
        method: 'POST',
        body: newGender,
      }),
      invalidatesTags: ['Genders'],
    }),

    // Actualizar un género existente
    updateGender: builder.mutation<GenderSchema, { id: string; updatedGender: Partial<GenderSchema> }>({
      query: ({ id, updatedGender }) => ({
        url: `/genders/${id}`,
        method: 'PUT',
        body: updatedGender,
      }),
      invalidatesTags: ['Genders'],
    }),

    // Eliminar un género
    deleteGender: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/genders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Genders'],
    }),

  }),
});

export const {
  useGetGendersQuery,
  useGetGenderByIdQuery,
  useCreateGenderMutation,
  useUpdateGenderMutation,
  useDeleteGenderMutation,
} = gendersApi;
