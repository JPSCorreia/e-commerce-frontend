import { createSlice } from '@reduxjs/toolkit'

export const isLoggedSlice = createSlice({
 name: 'isLogged',
 initialState: {
   value: false
 },
 reducers: {
   loginNowAuth(state) {
     state.value = true;
   },
   logoutNowAuth(state) {
     state.value = false;
   }
 },

 extraReducers: {}
})

export const { loginNowAuth, logoutNowAuth } = isLoggedSlice.actions;
export default isLoggedSlice.reducer;