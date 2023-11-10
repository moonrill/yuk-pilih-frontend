import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { appConfig } from "../../config/appConfig";
import token from "../utils/token";

export const pollApi = createApi({
  reducerPath: "pollApi",
  baseQuery: fetchBaseQuery({
    baseUrl: appConfig.apiUrl,
    jsonContentType: "application/json",
  }),
  endpoints: (builder) => ({
    getPolls: builder.query({
      query: () => ({
        url: "/poll",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.get("access_token")}`,
        },
      }),
    }),
  }),
});

export const { useGetPollsQuery } = pollApi;
