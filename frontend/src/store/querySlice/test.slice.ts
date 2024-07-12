/**
 *
 * Test Slice - Created with Plop
 *
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const testSlice = createApi({
  reducerPath: `testReducer`,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL,
  }),
  tagTypes: ['fetch'],
  endpoints: builder => {
    return {
      fetchTest: builder.query({
        providesTags: () => {
          return ['fetch'];
        },
        query: id => {
          return {
            url: `/test/get/${id}`,
            method: 'GET',
          };
        },
      }),
      addTest: builder.mutation({
        invalidatesTags: () => {
          return ['fetch'];
        },
        query: data => {
          return {
            url: '/test/create',
            method: 'POST',
            body: data,
          };
        },
      }),
      editTest: builder.mutation({
        invalidatesTags: () => {
          return ['fetch'];
        },
        query: ({ id, data }) => {
          return {
            url: '/test/update/' + id,
            method: 'PATCH',
            body: data,
          };
        },
      }),
      deleteTest: builder.mutation({
        invalidatesTags: () => {
          return ['fetch'];
        },
        query: id => {
          return {
            url: '/test/delete/' + id,
            method: 'DELETE',
          };
        },
      }),
    };
  },
});

export const {
  useFetchTestQuery,
  useAddTestMutation,
  useEditTestMutation,
  useDeleteTestMutation,
} = testSlice;
