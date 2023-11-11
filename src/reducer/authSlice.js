import { createSlice } from "@reduxjs/toolkit"
import token from "../../utils/token"

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: token.get(),
    user: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      token.set(action.payload);
    },
    removeToken: (state) => {
      state.token = null;
      token.remove();
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  }
})

export const {setToken, removeToken, setUser} = authSlice.actions;