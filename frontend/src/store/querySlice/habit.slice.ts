/**
 *
 * Habit Slice - Created with Plop
 *
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const habitSlice = createApi({
  reducerPath: `habitReducer`,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL,
  }),
  tagTypes: ['fetch'],
  endpoints: builder => {
    return {
      fetchHabit: builder.query({
        providesTags: () => {
          return ['fetch'];
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
          return ['fetch'];
        },
        query: data => {
          return {
            url: '/habit/create',
            method: 'POST',
            body: data,
          };
        },
      }),
      editHabit: builder.mutation({
        invalidatesTags: () => {
          return ['fetch'];
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
          return ['fetch'];
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
