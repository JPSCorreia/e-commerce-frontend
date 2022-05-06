import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { persistReducer } from 'redux-persist'
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage'
import isAuthenticatedReducer from "./isAuthenticatedSlice";
import productQuantitySliceReducer from "./productQuantitySlice";
import cartItemsSliceReducer from "./cartItemsSlice";
import loadedComponentsReducer from "./loadedComponentsSlice";

const persistConfig = {
  key:'main-root',
  storage, 
  blacklist: ['loadedComponents']
}

const rootReducer = combineReducers({
  isAuthenticated: isAuthenticatedReducer,
  productQuantity: productQuantitySliceReducer,
  cartItems: cartItemsSliceReducer,
  loadedComponents: loadedComponentsReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false, immutableCheck: false})
})

setupListeners(store.dispatch);

export default store;