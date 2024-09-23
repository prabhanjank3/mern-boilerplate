/**
 *
 * Journal Slice - Created with Plop
 *
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const journalSlice = createApi({
  reducerPath: `journalReducer`,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL,
  }),
  tagTypes: ['fetchJournal'],
  endpoints: builder => {
    return {
      fetchJournal: builder.query({
        providesTags: () => {
          return ['fetchJournal'];
        },
        query: date => {
          return {
            url: `/journal/by-date?date=${date}`,
            method: 'GET',
          };
        },
      }),
    };
  },
});

export const { useFetchJournalQuery } = journalSlice;
