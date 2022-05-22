import { createSlice } from '@reduxjs/toolkit'
import { api } from '../Features/routes';

export const orderDataSlice = createSlice({
  name: 'orderData',
  initialState: {
    allOrdersData: [],
    allOrdersDataIsLoading: true,
    allOrderItemsData: [],
    allOrderItemsDataIsLoading: true,
    addOrderToastDisplayed: false,
    addOrderToastDisplayedIsLoading: true
  },
  reducers: {
  },
  extraReducers: {

    [api.orders.setAddOrderToastDisplayed.pending]: (state, action) => {
      state.addOrderToastDisplayedIsLoading = true;
    },
    [api.orders.setAddOrderToastDisplayed.fulfilled]: (state, action) => {
      state.addOrderToastDisplayed = action.payload;
      state.addOrderToastDisplayedIsLoading = false;
    },
    [api.orders.setAddOrderToastDisplayed.rejected]: (state, action) => {
      state.addOrderToastDisplayedIsLoading = true;
    },

    [api.orders.getAllOrders.pending]: (state, action) => {
      state.allOrdersDataIsLoading = true;
    },
    [api.orders.getAllOrders.fulfilled]: (state, action) => {
      state.allOrdersData = action.payload;
      state.allOrdersDataIsLoading = false;
    },
    [api.orders.getAllOrders.rejected]: (state, action) => {
      state.allOrdersDataIsLoading = true;
    },


    [api.orders.getAllOrderItems.pending]: (state, action) => {
      state.allOrderItemsDataIsLoading = true;
    },
    [api.orders.getAllOrderItems.fulfilled]: (state, action) => {
      state.allOrderItemsData = action.payload;
      state.allOrderItemsDataIsLoading = false;
    },
    [api.orders.getAllOrderItems.rejected]: (state, action) => {
      state.allOrderItemsDataIsLoading = true;
    },


  }
})

export default orderDataSlice.reducer;