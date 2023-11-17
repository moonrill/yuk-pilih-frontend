import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { appConfig } from '../../config/appConfig';
import token from '../../utils/token';
import { removeToken, resetAuth, setShouldReset, setToken, setUser } from '../reducer/authSlice';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: appConfig.apiUrl,
    jsonContentType: 'application/json',
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ username, password }) => ({
        url: '/auth/login',
        method: 'POST',
        body: { username, password },
      }),
      onQueryStarted(_queryParam, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then(({ data: { access_token } }) => {
            dispatch(authApi.endpoints.getUser.initiate(access_token))
              .unwrap()
              .then((user) => dispatch(setUser(user)))
          })
          .catch(({error: {status, data}}) => {
            if(status === 307) {
              dispatch(setShouldReset(true));
              dispatch(setToken(data?.access_token))
            }
          })
      },
    }),
    getUser: builder.query({
      query: (token) => ({
        url: '/auth/me',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ data, token }) => ({
        url: 'auth/reset-password',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      onQueryStarted(_queryParam, { dispatch, queryFulfilled }) {
        queryFulfilled.then(() => dispatch(authApi.endpoints.logout.initiate(token.get())))
      }
    }),
    logout: builder.mutation({
      query: (token) => ({
        url: '/auth/logout',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      onQueryStarted(_queryParam, { dispatch, queryFulfilled }) {
        queryFulfilled.then(() => {
          dispatch(resetAuth());
        });
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUserQuery,
  useResetPasswordMutation,
  useLogoutMutation,
} = authApi;
