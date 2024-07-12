import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
// IMPORT SLICES HERE

const rootReducer = combineReducers({
  // eslint-disable-next-line prettier/prettier
  // INSERT REDUCERS HERE
});

const store = configureStore({
  reducer: rootReducer,
  // eslint-disable-next-line prettier/prettier
  middleware: defaultMiddleware => defaultMiddleware()
  // INSERT MIDDLEWARES HERE
});

setupListeners(store.dispatch);
export default store;
