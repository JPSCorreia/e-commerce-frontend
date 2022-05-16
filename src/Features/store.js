import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { persistReducer } from 'redux-persist'
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage'
import productQuantitySliceReducer from "./productQuantitySlice";
import cartItemsSliceReducer from "./cartItemsSlice";
import loadedComponentsReducer from "./loadedComponentsSlice";
import productDataSliceReducer from "./productDataSlice";
import orderDataSliceReducer from "./orderDataSlice";
import cartDataSliceReducer from "./cartDataSlice";

const persistConfig = {
  key:'main-root',
  storage, 
  blacklist: ['loadedComponents']
}

const rootReducer = combineReducers({
  productQuantity: productQuantitySliceReducer,
  productData: productDataSliceReducer,
  orderData: orderDataSliceReducer,
  cartData: cartDataSliceReducer,
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