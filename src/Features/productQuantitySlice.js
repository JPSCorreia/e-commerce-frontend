import { createSlice } from '@reduxjs/toolkit'

export const productQuantitySlice = createSlice({
 name: 'productQuantity',
 initialState: []
   
 ,
 reducers: {
   setQuantity(state, action) {
     state[action.payload.index] = action.payload.data;
   },
 },
 extraReducers: {}
})

export const { setQuantity } = productQuantitySlice.actions;
export default productQuantitySlice.reducer;