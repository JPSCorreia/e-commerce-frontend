import { createSlice } from '@reduxjs/toolkit'

export const toggleUsersSlice = createSlice({
 name: 'toggleUsers',
 initialState: {
   value: false
 },
 reducers: {
   toggle(state) {
     state.value = !state.value;
   }
 },
 extraReducers: {}
})

export const { toggle } = toggleUsersSlice.actions;
export default toggleUsersSlice.reducer;