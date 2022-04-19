import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const backendURL = process.env.IN_DEVELOPMENT? process.env.REACT_APP_BACKEND_URL : process.env.PUBLIC_REACT_APP_BACKEND_URL

export const api = createApi({
  reducersPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: backendURL
  }),
  tagTypes: ["Products", "Users", "Sessions"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/api/products",
      providesTags: (result) =>
        result ? [ ...result.map(({id}) => ({type: 'Products', id})),
          { type: 'Products', id: 'LIST' },
        ] : [{ type: 'Products', id: 'LIST'}],
    }),
    verifySession: builder.query({
      query: () => "/auth/register",
      // providesTags: (result) =>
      //   result ? [ ...result.map(({id}) => ({type: 'Sessions', id})),
      //     { type: 'Sessions', id: 'LIST' },
      //   ] : [{ type: 'Sessions', id: 'LIST'}],
    }),
    getProduct: builder.query({
      query: (productId) => `/api/products/${productId}`,
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: "/api/products",
        method: "POST",
        body: product,
      })
    }),
    getUsers: builder.query({
      query: () => "/api/users",
      providesTags: (result) =>
        result ? [ ...result.map(({id}) => ({type: 'Users', id})),
          { type: 'Users', id: 'LIST' },
        ] : [{ type: 'Users', id: 'LIST'}],
    }),
    getUser: builder.query({
      query: (userId) => `/api/users/${userId}`,
    }),
    addUser: builder.mutation({
      query: (user) => ({
        url: "/api/users",
        method: "POST",
        body: user,
      })
    }),
    // registerUser: builder.mutation({
    //   query: (authData) => ({
    //     url: "/auth/register",
    //     method: "POST",
    //     headers: {'Content-Type': 'application/json'},
    //     body: authData,
    //   }),
    //   // transformResponse: (response, meta, arg) => response,
    // }),
    // loginUser: builder.mutation({
    //   query: (loginData) => ({
    //     url: "/auth/login",
    //     method: "POST",
    //     body: loginData
    //   })
    // }),
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
  useLoginUserMutation,
  useVerifySessionQuery,
} = api;
