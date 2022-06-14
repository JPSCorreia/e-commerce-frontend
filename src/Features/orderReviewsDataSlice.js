import { createSlice } from '@reduxjs/toolkit'
import { api } from './routes';

export const orderReviewsDataSlice = createSlice({
  name: 'orderReviewsData',
  initialState: {
    dataIsLoading: true,
  },
  reducers: {
  },
  extraReducers: {

    [api.orderReviews.getReviews.pending]: (state, action) => {
      state.dataIsLoading = true;
    },
    [api.orderReviews.getReviews.fulfilled]: (state, action) => {
      state[action.payload.order_id] = action.payload.data;
      state.dataIsLoading = false;
    },
    [api.orderReviews.getReviews.rejected]: (state, action) => {
      state.dataIsLoading = true;
    },

    // [api.orderReviews.addReview.pending]: (state, action) => {
    //   state.dataIsLoading = true;
    // },
    // [api.orderReviews.addReview.fulfilled]: (state, action) => {
    //   state.dataIsLoading = false;
    //   state[action.payload.products_id].push(action.payload)
    // },
    // [api.orderReviews.addReview.rejected]: (state, action) => {
    //   state.dataIsLoading = true;
    // },


  }
})

export default orderReviewsDataSlice.reducer;