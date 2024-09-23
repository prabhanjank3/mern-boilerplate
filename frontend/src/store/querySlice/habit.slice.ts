/**
 *
 * Habit Slice - Created with Plop
 *
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { journalSlice } from './journal.slice';

export const habitSlice = createApi({
  reducerPath: `habitReducer`,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL,
  }),
  tagTypes: ['fetchHabit', 'fetchJournal'],
  endpoints: builder => {
    return {
      fetchHabit: builder.query({
        providesTags: () => {
          return ['fetchHabit'];
        },
        query: id => {
          return {
            url: `/habit/get/${id}`,
            method: 'GET',
          };
        },
      }),
      addHabit: builder.mutation({
        invalidatesTags: () => {
          return ['fetchJournal'];
        },
        query: data => {
          return {
            url: '/habit/create',
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
      editHabit: builder.mutation({
        invalidatesTags: () => {
          return ['fetchHabit'];
        },
        query: ({ id, data }) => {
          return {
            url: '/habit/update/' + id,
            method: 'PATCH',
            body: data,
          };
        },
      }),
      deleteHabit: builder.mutation({
        invalidatesTags: () => {
          return [];
        },
        query: id => {
          return {
            url: '/habit/delete/' + id,
            method: 'DELETE',
          };
        },
      }),
    };
  },
});

export const {
  useFetchHabitQuery,
  useAddHabitMutation,
  useEditHabitMutation,
  useDeleteHabitMutation,
} = habitSlice;
