import { createSlice } from '@reduxjs/toolkit'

export const isAuthenticatedSlice = createSlice({
 name: 'isAuthenticated',
 initialState: {
   value: null
 },
 reducers: {
   loginNow(state) {
     state.value = true;
   },
   logoutNow(state) {
     state.value = false;
   },
   setLogState(state, action) {
     state.value = action.payload;
   }
 },
 extraReducers: {}
})

export const { loginNow, logoutNow, setLogState } = isAuthenticatedSlice.actions;
export default isAuthenticatedSlice.reducer;