import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserSchema } from '../schemas/UserSchemas'; 

export const usersTableApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query<UserSchema[], void>({
      query: () => ({
        url: '/users',
        method: 'GET',
        credentials: "include",
      }),
      providesTags: ['Users'],
    }),
    createUser: builder.mutation<UserSchema, Partial<UserSchema> & { password: string }>({
      query: (newUser) => ({
        url: '/users',
        method: 'POST',
        credentials: "include",
        body: newUser,
      }),
      invalidatesTags: ['Users'],
    }),
    updateUser: builder.mutation<UserSchema, { id: string; data: Partial<UserSchema> }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ['Users'],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
        credentials: "include",
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersTableApi ;
