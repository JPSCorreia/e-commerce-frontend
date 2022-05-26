import { createSlice } from '@reduxjs/toolkit'
import { api } from '../Features/routes';

export const addressDataSlice = createSlice({
  name: 'addressData',
  initialState: {
    data: [],
    dataIsLoading: true,
  },
  reducers: {
  },
  extraReducers: {


    [api.addresses.getAddresses.pending]: (state, action) => {
      state.dataIsLoading = true;
    },
    [api.addresses.getAddresses.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.dataIsLoading = false;
    },
    [api.addresses.getAddresses.rejected]: (state, action) => {
      state.dataIsLoading = true;
    },


    // [api.addresses.addAddress.pending]: (state, action) => {
    //   state.dataIsLoading = true;
    // },
    // [api.addresses.addAddress.fulfilled]: (state, action) => {
    //   state.dataIsLoading = false;
    //   return {
    //     data: [
    //       ...state.data,
    //       action.payload
    //     ]
    //   }
    // },
    // [api.addresses.addAddress.rejected]: (state, action) => {
    //   state.dataIsLoading = true;
    // },



  }
})

export default addressDataSlice.reducer;