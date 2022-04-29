import { createSlice } from '@reduxjs/toolkit'

export const isAuthenticatedSlice = createSlice({
 name: 'isAuthenticated',
 initialState: {
   value: null,
   username: null
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
   },
   setUsername(state, action) {
    state.username = action.payload;
   },
   setEmail(state, action) {
    state.email = action.payload;
   },
 },
 extraReducers: {}
})

export const { loginNow, logoutNow, setLogState, setUsername, setEmail } = isAuthenticatedSlice.actions;
export default isAuthenticatedSlice.reducer;