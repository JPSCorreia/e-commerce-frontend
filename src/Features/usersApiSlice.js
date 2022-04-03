import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducersPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://e-commerce-backend2.herokuapp.com/api",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      providesTags: (result) =>
        result ? [ ...result.map(({id}) => ({type: 'Users', id})),
          { type: 'Users', id: 'LIST' },
        ] : [{ type: 'Users', id: 'LIST'}],
    }),
    getUser: builder.query({
      query: (userId) => `/users/${userId}`,
    }),
    addUser: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      })
    })
  })
})

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
} = usersApi;