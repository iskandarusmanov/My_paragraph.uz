import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: false,
    submit: false
  },
  reducers: {
    authFalse: (state) => {
      state.data = false;
    },
    authTrue: (state) => {
      state.data = true;
    },
    submitOn: (state) => {
      state.submit = true
    },
    submitOff: (state) => {
      state.submit = false
    },
  },
});

export const { authTrue, authFalse, submitOn, submitOff } = authSlice.actions;

export default authSlice.reducer;
