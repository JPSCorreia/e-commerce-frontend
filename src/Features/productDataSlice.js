import { createSlice } from '@reduxjs/toolkit'
import { api } from '../Features/routes';

export const productDataSlice = createSlice({
  name: 'productData',
  initialState: {
    data: [],
    isLoading: true,
  },
  reducers: {
    // setProductData(state, action) {
    //   state.data = action.payload;
    //   state.isLoading = false;
    // },
  },
  extraReducers: {
    [api.getCartProductsByEmail.pending]: (state, action) => {
      state.isLoading = true;
    },

    [api.getCartProductsByEmail.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },

    [api.getCartProductsByEmail.rejected]: (state, action) => {
      state.isLoading = true;
    },
  }
})

export default productDataSlice.reducer;