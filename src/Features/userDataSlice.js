import { createSlice } from '@reduxjs/toolkit'
import { api } from '../Features/routes';

export const userDataSlice = createSlice({
  name: 'userData',
  initialState: {
    data: [],
    dataIsLoading: true,
    monthAndYear: [],
    monthAndYearIsLoading: true,
    month: '',
    year: '',
    userByEmail: '',
    userByEmailIsLoading: true,
    testCors: '',
    testCorsIsLoading: true
  },
  reducers: {
  },
  extraReducers: {


    [api.users.testCors.pending]: (state, action) => {
      state.testCorsIsLoading = true;
    },
    [api.users.testCors.fulfilled]: (state, action) => {
      console.log(action.payload)
      state.testCors = action.payload;
      state.testCorsIsLoading = false;
    },
    [api.users.testCors.rejected]: (state, action) => {
      state.testCorsIsLoading = true;
    },

    [api.users.getUsers.pending]: (state, action) => {
      state.dataIsLoading = true;
    },
    [api.users.getUsers.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.dataIsLoading = false;
    },
    [api.users.getUsers.rejected]: (state, action) => {
      state.dataIsLoading = true;
    },


    [api.users.getUserByEmail.pending]: (state, action) => {
      state.userByEmailIsLoading = true;
    },
    [api.users.getUserByEmail.fulfilled]: (state, action) => {
      state.userByEmail = action.payload;
      state.userByEmailIsLoading = false;
    },
    [api.users.getUserByEmail.rejected]: (state, action) => {
      state.userByEmailIsLoading = true;
    },





    [api.users.getMonthAndYear.pending]: (state, action) => {
      state.monthAndYearIsLoading = true;
    },
    [api.users.getMonthAndYear.fulfilled]: (state, action) => {
      state.monthAndYear = action.payload;
      state.month = action.payload.data.month;
      state.year = action.payload.data.year;
      state.monthAndYearIsLoading = false;
    },
    [api.users.getMonthAndYear.rejected]: (state, action) => {
      state.monthAndYearIsLoading = true;
    },

  }
})

export default userDataSlice.reducer;