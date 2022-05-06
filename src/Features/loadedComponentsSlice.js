import { createSlice } from '@reduxjs/toolkit'

export const loadedComponentsSlice = createSlice({
  name: 'loadedComponents',
  initialState: {
    productList: false,
    cartList: false,
  },
  reducers: {
    setProductListLoaded(state, action) {
      state.productList = action.payload;
    },
    setCartListLoaded(state, action) {
      state.cartList = action.payload;
    },
  },
  extraReducers: {}
})

export const { setProductListLoaded, setCartListLoaded } = loadedComponentsSlice.actions;
export default loadedComponentsSlice.reducer;