import { createSlice } from '@reduxjs/toolkit'
import { api } from '../Features/routes';

export const productDataSlice = createSlice({
  name: 'productData',
  initialState: {
    data: [],
    isLoading: true,
  },
  reducers: {
  },
  extraReducers: {
    [api.getProducts.pending]: (state, action) => {
      state.isLoading = true;
    },

    [api.getProducts.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },

    [api.getProducts.rejected]: (state, action) => {
      state.isLoading = true;
    },
  }
})

export default productDataSlice.reducer;