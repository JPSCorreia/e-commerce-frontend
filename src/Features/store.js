import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { persistReducer } from 'redux-persist'
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage'
import { api } from "./apiSlice";
import isAuthenticatedReducer from "./isAuthenticatedSlice";

const persistConfig = {
  key:'main-root',
  storage, 
}

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  isAuthenticated: isAuthenticatedReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false, immutableCheck: false})
      .concat(api.middleware)
})

setupListeners(store.dispatch);

export default store;