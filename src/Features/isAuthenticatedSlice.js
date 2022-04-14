import { createSlice } from '@reduxjs/toolkit'

export const isAuthenticatedSlice = createSlice({
 name: 'isAuthenticated',
 initialState: {
   value: false
 },
 reducers: {
   loginNow(state) {
     state.value = true;
   },
   logoutNow(state) {
     state.value = false;
   }
 },
 extraReducers: {}
})

export const { loginNow, logoutNow } = isAuthenticatedSlice.actions;
export default isAuthenticatedSlice.reducer;