import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducersPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://e-commerce-backend2.herokuapp.com/api",
  }),
  endpoints: (builder) => ({
    authUser: builder.mutation({
      query: (authData) => ({
        url: "/login",
        method: "POST",
        body: authData,
      })
    }),
    invalidatesTags: (result, error, {id}) => [{type: "Auth", id }],
  })
})

export const {
  useAuthUserMutation,
} = authApi;