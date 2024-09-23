import { configureStore, StoreEnhancer } from '@reduxjs/toolkit';
import { createInjectorsEnhancer } from 'redux-injectors';
import createSagaMiddleware from 'redux-saga';

import { appleSlice } from './querySlice/apple.slice';
import { habitSlice } from './querySlice/habit.slice';
import { entrySlice } from './querySlice/entry.slice';
import { journalSlice } from './querySlice/journal.slice';
// IMPORT SLICES HERE

import { createReducer } from './reducers';

export function configureAppStore() {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const { run: runSaga } = sagaMiddleware;

  // Create the store with saga middleware
  const middlewares = [sagaMiddleware];

  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ] as StoreEnhancer[];

  const store = configureStore({
    reducer: createReducer(),
    devTools:
      /* istanbul ignore next line */
      process.env.NODE_ENV !== 'production' ||
      process.env.PUBLIC_URL.length > 0,
    enhancers,
    middleware: defaultMiddleware =>
      [...defaultMiddleware(), ...middlewares]
        .concat(appleSlice.middleware)
        .concat(habitSlice.middleware)
        .concat(entrySlice.middleware)
        .concat(journalSlice.middleware),
    // INSERT MIDDLEWARES HERE
  });

  return store;
}
