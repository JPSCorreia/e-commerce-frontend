import { createSlice } from '@reduxjs/toolkit'

export const loadedComponentsSlice = createSlice({
  name: 'loadedComponents',
  initialState: {
    productList: false,
    cartList: false,
    orderList: false,
    orderDetailedList: false,
  },
  reducers: {
    setProductListLoaded(state, action) {
      state.productList = action.payload;
    },
    setCartListLoaded(state, action) {
      state.cartList = action.payload;
    },
    setOrderListLoaded(state, action) {
      state.orderList = action.payload;
    },
    setOrderDetailedListLoaded(state, action) {
      state.orderDetailedList = action.payload;
    },
  },
  extraReducers: {}
})

export const { setProductListLoaded, setCartListLoaded, setOrderListLoaded, setOrderDetailedListLoaded } = loadedComponentsSlice.actions;
export default loadedComponentsSlice.reducer;