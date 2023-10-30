import { createSlice } from '@reduxjs/toolkit'
import { api } from './routes';

export const reviewsDataSlice = createSlice({
  name: 'reviewsData',
  initialState: {
    dataIsLoading: true,
  },
  reducers: {
  },
  extraReducers: {

    [api.reviews.getReviews.pending]: (state, action) => {
      state.dataIsLoading = true;
    },
    [api.reviews.getReviews.fulfilled]: (state, action) => {
      state[action.payload.products_id] = action.payload.data;
      state.dataIsLoading = false;
    },
    [api.reviews.getReviews.rejected]: (state, action) => {
      state.dataIsLoading = true;
    },


    // [api.reviews.addReview.pending]: (state, action) => {
    //   state.dataIsLoading = true;
    // },
    // [api.reviews.addReview.fulfilled]: (state, action) => {
    //   state.dataIsLoading = false;
    //   state[action.payload.products_id].push(action.payload)
    // },
    // [api.reviews.addReview.rejected]: (state, action) => {
    //   state.dataIsLoading = true;
    // },


  }
})

export default reviewsDataSlice.reducer;