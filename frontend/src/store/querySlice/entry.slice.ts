/**
 *
 * Entry Slice - Created with Plop
 *
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { journalSlice } from './journal.slice';
export const entrySlice = createApi({
  reducerPath: `entryReducer`,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL,
  }),
  tagTypes: ['fetchJournal', 'fetchEntry'],
  endpoints: builder => {
    return {
      fetchEntry: builder.query({
        providesTags: () => {
          return ['fetchEntry'];
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
          return ['fetchJournal'];
        },
        query: ({ habitId, data }) => {
          return {
            url: `/entry/create/${habitId}`,
            method: 'POST',
            body: data,
          };
        },
        onQueryStarted: (arg, api) => {
          api.queryFulfilled.then(() => {
            api.dispatch(journalSlice.util.invalidateTags(['fetchJournal']));
          });
        },
      }),
      editEntry: builder.mutation({
        invalidatesTags: () => {
          return ['fetchJournal'];
        },
        query: ({ id, data }) => {
          return {
            url: '/entry/update/' + id,
            method: 'PATCH',
            body: data,
          };
        },
        onQueryStarted: (arg, api) => {
          api.queryFulfilled.then(() => {
            api.dispatch(journalSlice.util.invalidateTags(['fetchJournal']));
          });
        },
      }),
      deleteEntry: builder.mutation({
        invalidatesTags: () => {
          return ['fetchJournal'];
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
