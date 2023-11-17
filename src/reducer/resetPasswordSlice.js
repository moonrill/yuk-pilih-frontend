import { createSlice } from "@reduxjs/toolkit";

export const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState: {
    old_password: '',
    new_password: '',
    confirm_password: ''
  },
  reducers: {
    setOldPassword: (state, action) => {
      state.old_password = action.payload;
    },
    setNewPassword: (state, action) => {
      state.new_password = action.payload;
    },
    setConfirmPassword: (state, action) => {
      state.confirm_password = action.payload;
    }
  }
})

export const {setOldPassword, setNewPassword, setConfirmPassword} = resetPasswordSlice.actions;