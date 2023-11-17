import { createSlice } from '@reduxjs/toolkit';
import token from '../../utils/token';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: token.get(),
    user: null,
    shouldReset: localStorage.getItem('should_reset') ?? false,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      token.set(action.payload);
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setShouldReset: (state, action) => {
      state.shouldReset = action.payload;
      localStorage.setItem('should_reset', action.payload);
    },
    resetAuth: (state) => {
      state.token = null;
      state.user = null;
      state.shouldReset = false;
      token.remove();
      localStorage.removeItem('should_reset');
    }
  },
});

export const { setToken, removeToken, setUser, setShouldReset, resetAuth } =
  authSlice.actions;
