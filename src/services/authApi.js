import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { appConfig } from '../config/appConfig';

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
    }),
  }),
});

export const { useLoginMutation } = authApi;
