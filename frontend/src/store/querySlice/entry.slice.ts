/**
 *
 * Entry Slice - Created with Plop
 *
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const entrySlice = createApi({
  reducerPath: `entryReducer`,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL,
  }),
  tagTypes: ['fetch'],
  endpoints: builder => {
    return {
      fetchEntry: builder.query({
        providesTags: () => {
          return ['fetch'];
        },
        query: id => {
          return {
            url: `/entry/get/${id}`,
            method: 'GET',
          };
        },
      }),
      addEntry: builder.mutation({
        invalidatesTags: () => {
          return ['fetch'];
        },
        query: ({ habitId, data }) => {
          return {
            url: `/entry/create/${habitId}`,
            method: 'POST',
            body: data,
          };
        },
      }),
      editEntry: builder.mutation({
        invalidatesTags: () => {
          return ['fetch'];
        },
        query: ({ id, data }) => {
          return {
            url: '/entry/update/' + id,
            method: 'PATCH',
            body: data,
          };
        },
      }),
      deleteEntry: builder.mutation({
        invalidatesTags: () => {
          return ['fetch'];
        },
        query: id => {
          return {
            url: '/entry/delete/' + id,
            method: 'DELETE',
          };
        },
      }),
    };
  },
});

export const {
  useFetchEntryQuery,
  useAddEntryMutation,
  useEditEntryMutation,
  useDeleteEntryMutation,
} = entrySlice;
