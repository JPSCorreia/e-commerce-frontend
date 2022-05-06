import { createSlice } from '@reduxjs/toolkit'

export const cartItemsSlice = createSlice({
  name: 'cartItems',
  initialState: {
    numberOfItems: 0,
    totalPrice: 0,
  },
  reducers: {
    setNumberOfItems(state, action) {
      state.numberOfItems = action.payload;
    },
    setTotalPrice(state, action) {
      state.totalPrice = action.payload;
    },
  },
  extraReducers: {}
})

export const { setNumberOfItems, setTotalPrice } = cartItemsSlice.actions;
export default cartItemsSlice.reducer;