import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducersPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api`,
  }),
  endpoints: (builder) => ({
    authUser: builder.mutation({
      query: (authData) => ({
        url: "/login",
        method: "POST",
        body: authData,
      }),
      invalidatesTags: (result, error, {id}) => [{type: "Auth", id }]
    }),
    registerUser: builder.mutation({
      query: (authData) => ({
        url: "/register",
        method: "POST",
        body: authData,
      }),
      invalidatesTags: (result, error, {id}) => [{type: "Auth", id }]
    }),
    
  })
})

export const {
  useAuthUserMutation,
  useRegisterUserMutation
} = authApi;