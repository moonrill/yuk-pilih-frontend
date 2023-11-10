import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    username: '',
    password: ''
  },
  reducers: {
    /**
     * Sets the username in the state.
     *
     * @param {Object} state - The current state object.
     * @param {Object} action - The action object containing the payload.
     * @return {void} This function does not return anything.
     */
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    /**
     * Sets the password in the state.
     *
     * @param {Object} state - The current state object.
     * @param {Object} action - The action object containing the payload.
     */
    setPassword: (state, action) => {
      state.password = action.payload;
    }
  }
})

export const {setUsername, setPassword} = loginSlice.actions;