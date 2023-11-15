import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { appConfig } from "../../config/appConfig";
import token from "../../utils/token";

export const pollApi = createApi({
  reducerPath: "pollApi",
  baseQuery: fetchBaseQuery({
    baseUrl: appConfig.apiUrl,
    jsonContentType: "application/json",
  }),
  tagTypes: ["Polls"],
  endpoints: (builder) => ({
    getPolls: builder.query({
      query: (token) => ({
        url: "/poll",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: [{type: "Polls", id: "LIST"}],
    }),
    createPoll: builder.mutation({
      query: ({data, token}) => ({
        url: "/poll",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [{type: "Polls", id: "LIST"}],
    }),
    deletePoll: builder.mutation({
      query: ({id, token}) => ({
        url: `/poll/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }),
      invalidatesTags: [{type: "Polls", id: "LIST"}],
    })
  }),
});

export const { useGetPollsQuery, useCreatePollMutation, useDeletePollMutation } = pollApi;
