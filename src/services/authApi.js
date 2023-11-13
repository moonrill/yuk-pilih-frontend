import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { appConfig } from "../../config/appConfig";
import { removeToken, setUser } from "../reducer/authSlice";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: appConfig.apiUrl,
    jsonContentType: "application/json",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ username, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { username, password },
      }),
      onQueryStarted(_queryParam, {dispatch, queryFulfilled}) {
        queryFulfilled.then(({data: {access_token}}) => {
          dispatch(authApi.endpoints.getUser.initiate(access_token))
            .unwrap()
            .then((user) => dispatch(setUser(user)))
        })
      }
    }),
    getUser: builder.query({
      query: (token) => ({
        url: "/auth/me",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }),
    logout: builder.mutation({
      query: (token) => ({
        url: "/auth/logout",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
      onQueryStarted(_queryParam, {dispatch}) {
        dispatch(removeToken())
        dispatch(setUser(null))
      }
    })
  }),
});

export const { useLoginMutation, useGetUserQuery, useLogoutMutation } = authApi;
