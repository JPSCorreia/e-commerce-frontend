import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// TODO: make this env variable work
 const backendURL = process.env.REACT_APP_IN_DEVELOPMENT? process.env.REACT_APP_BACKEND_URL : process.env.REACT_APP_PUBLIC_BACKEND_URL 

export const api = createApi({
  reducersPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: backendURL
  }),
  // tagTypes: ["Products", "Users", "Sessions"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/api/products",
      // providesTags: (result) =>
      //   result ? [ ...result.map(({id}) => ({type: 'Products', id})),
      //     { type: 'Products', id: 'LIST' },
      //   ] : [{ type: 'Products', id: 'LIST'}],
    }),
    verifySession: builder.query({
      query: () => "/auth/current-session",
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
      // providesTags: (result) =>
      //   result ? [ ...result.map(({id}) => ({type: 'Users', id})),
      //     { type: 'Users', id: 'LIST' },
      //   ] : [{ type: 'Users', id: 'LIST'}],
    }),
    getUserByUsername: builder.query({
      query: (username) => `/api/users/${username}`,
    }),
    addUser: builder.mutation({
      query: (user) => ({
        url: "/api/users",
        method: "POST",
        body: user,
      })
    }),
    getCartByEmail: builder.query({
      query: ({authenticatedEmail, id}) => `/api/cart_items/get_cart/${authenticatedEmail}/${id}`,
    }),
    addProductToCart: builder.mutation({
      query: ({authenticatedEmail, id, quant}) => ({
        url: `/api/cart_items/`,
        method: "POST",
        body: {
          products_id: id,
          user_email: authenticatedEmail,
          quantity: quant
        }
      })
    }),
    getCartProductsByEmail: builder.query({
      query: (authenticatedEmail) => `/api/cart_items/cart_products/${authenticatedEmail}`,
    }),
    removeStockAddQuantity: builder.mutation({
      query: ({quant, id, authenticatedEmail}) => ({
        url: `/api/cart_items/`,
        method: "PUT",
        body: {
          quantity: quant,
          products_id: id,   
          user_email: authenticatedEmail  
        }
      })
    }),
    removeQuantityAddStock: builder.mutation({
      query: ({quant, id, authenticatedEmail}) => ({
        url: `/api/cart_items/remove_quantity`,
        method: "PUT",
        body: {
          quantity: quant,
          products_id: id,   
          user_email: authenticatedEmail  
        }
      })
    }),
    deleteFromCart: builder.mutation({
      query: (id) => ({
        url: `/api/cart_items/${id}`,
        method: "DELETE"
      })
    }),
    removeStock: builder.mutation({
      query: ({quant, id, authenticatedEmail}) => ({
        url: `/api/products/`,
        method: "PUT",
        body: {
          quantity: quant,
          products_id: id
        }
      })
    }),
    getTotalPrice: builder.query({
      query: (email) => `/api/cart_items/total_price/${email}`,
    }),

  })
})

export const {
  useLazyGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useLazyGetUsersQuery,
  useGetUserByUsernameQuery,
  useLazyGetUserByUsernameQuery,
  useAddUserMutation,
  useLazyAddUserMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useVerifySessionQuery,
  useLazyVerifySessionQuery,
  useLazyGetCartByEmailQuery,
  useAddProductToCartMutation,
  useLazyGetCartProductsByEmailQuery,
  useRemoveStockAddQuantityMutation,
  useRemoveQuantityAddStockMutation,
  useDeleteFromCartMutation,
  useRemoveStockMutation,
  useLazyGetTotalPriceQuery,
} = api;
