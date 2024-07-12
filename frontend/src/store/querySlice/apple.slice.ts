/**
 *
 * Apple Slice - Created with Plop
 *
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const appleSlice = createApi({
  reducerPath: `appleReducer`,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL,
  }),
  tagTypes: ['fetch'],
  endpoints: builder => {
    return {
      fetchApple: builder.query({
        providesTags: () => {
          return ['fetch'];
        },
        query: id => {
          return {
            url: `/apple/get/${id}`,
            method: 'GET',
          };
        },
      }),
      addApple: builder.mutation({
        invalidatesTags: () => {
          return ['fetch'];
        },
        query: data => {
          return {
            url: '/apple/create',
            method: 'POST',
            body: data,
          };
        },
      }),
      editApple: builder.mutation({
        invalidatesTags: () => {
          return ['fetch'];
        },
        query: ({ id, data }) => {
          return {
            url: '/apple/update/' + id,
            method: 'PATCH',
            body: data,
          };
        },
      }),
      deleteApple: builder.mutation({
        invalidatesTags: () => {
          return ['fetch'];
        },
        query: id => {
          return {
            url: '/apple/delete/' + id,
            method: 'DELETE',
          };
        },
      }),
    };
  },
});

export const {
  useFetchAppleQuery,
  useAddAppleMutation,
  useEditAppleMutation,
  useDeleteAppleMutation,
} = appleSlice;
