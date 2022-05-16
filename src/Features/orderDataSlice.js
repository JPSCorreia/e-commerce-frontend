import { createSlice } from '@reduxjs/toolkit'
import { api } from '../Features/routes';

export const orderDataSlice = createSlice({
  name: 'orderData',
  initialState: {
    data: [],
    isLoading: true,
    itemData: [],
  },
  reducers: {
  },
  extraReducers: {
    [api.getAllOrders.pending]: (state, action) => {
      state.isLoading = true;
    },

    [api.getAllOrders.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },

    [api.getAllOrders.rejected]: (state, action) => {
      state.isLoading = true;
    },
    [api.getAllOrderItems.pending]: (state, action) => {
      state.isLoading = true;
    },

    [api.getAllOrderItems.fulfilled]: (state, action) => {
      state.itemData = action.payload;
      state.isLoading = false;
    },

    [api.getAllOrderItems.rejected]: (state, action) => {
      state.isLoading = true;
    },
  }
})

export default orderDataSlice.reducer;