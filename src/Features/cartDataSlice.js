import { createSlice } from '@reduxjs/toolkit'
import { api } from '../Features/routes';

export const cartDataSlice = createSlice({
  name: 'cartData',
  initialState: {
    data: [],
    isLoading: true,
  },
  reducers: {
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

export default cartDataSlice.reducer;