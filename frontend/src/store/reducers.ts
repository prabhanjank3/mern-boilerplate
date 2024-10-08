/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from '@reduxjs/toolkit';

import { InjectedReducersType } from 'utils/types/injector-typings';

import { appleSlice } from './querySlice/apple.slice';
// IMPORT SLICES HERE

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(injectedReducers: InjectedReducersType = {}) {
  // Initially we don't have any injectedReducers, so returning identity function to avoid the error

  if (Object.keys(injectedReducers).length === 0) {
    return state => state;
  } else {
    return combineReducers({
      // eslint-disable-next-line prettier/prettier
      ...injectedReducers,
      [appleSlice.reducerPath]: appleSlice.reducer,
      // INSERT REDUCERS HERE
    });
  }
}
