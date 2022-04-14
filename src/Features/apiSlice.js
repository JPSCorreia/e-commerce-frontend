import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducersPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://e-commerce-backend2.herokuapp.com/api",
    baseUrl: 'http://localhost:3001/api'
  }),
  tagTypes: ["Products", "Users"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
      providesTags: (result) =>
        result ? [ ...result.map(({id}) => ({type: 'Products', id})),
          { type: 'Products', id: 'LIST' },
        ] : [{ type: 'Products', id: 'LIST'}],
    }),
    getProduct: builder.query({
      query: (productId) => `/products/${productId}`,
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      })
    }),
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
    }),
    registerUser: builder.mutation({
      query: (authData) => ({
        url: "/auth/register",
        method: "POST",
        body: authData,
      }),
    }),
  })
})

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useRegisterUserMutation,
} = api;
