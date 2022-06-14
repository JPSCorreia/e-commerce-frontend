import { createSlice } from '@reduxjs/toolkit'
import { api } from './routes';

export const reviewsDataSlice = createSlice({
  name: 'reviewsData',
  initialState: {
    dataIsLoading: true,
    singleReview: {},
    singleReviewIsLoading: true,
    reviews: [],
  },
  reducers: {
  },
  extraReducers: {

    [api.reviews.getReviews.pending]: (state, action) => {
      state.dataIsLoading = true;
    },
    [api.reviews.getReviews.fulfilled]: (state, action) => {
      state[action.payload.productId] = action.payload.data;
      state.dataIsLoading = false;
    },
    [api.reviews.getReviews.rejected]: (state, action) => {
      state.dataIsLoading = true;
    },


    [api.reviews.addReview.pending]: (state, action) => {
      state.dataIsLoading = true;
    },
    [api.reviews.addReview.fulfilled]: (state, action) => {
      state.dataIsLoading = false;
      state[action.payload.products_id].push(action.payload)
    },
    [api.reviews.addReview.rejected]: (state, action) => {
      state.dataIsLoading = true;
    },

    [api.reviews.editReview.pending]: (state, action) => {
      state.dataIsLoading = true;
    },
    [api.reviews.editReview.fulfilled]: (state, action) => {
      state.dataIsLoading = false;
      console.log(action.payload)
    },
    [api.reviews.editReview.rejected]: (state, action) => {
      state.dataIsLoading = true;
    },

    // [api.reviews.getReview.pending]: (state, action) => {
      
    // },
    // [api.reviews.getReview.fulfilled]: (state, action) => {
    //   console.log(action.payload)
    //   state.reviews[action.payload.products_id] = action.payload 
      
    // },
    // [api.reviews.getReview.rejected]: (state, action) => {
    // },


  }
})

export default reviewsDataSlice.reducer;