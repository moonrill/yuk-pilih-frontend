import { createSlice } from "@reduxjs/toolkit";

export const formPollSlice = createSlice({
  name: 'createPoll',
  initialState: {
    title: "",
    description: "",
    deadline: "",
    choices: ["", ""],
  },
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload
    },
    setDescription: (state, action) => {
      state.description = action.payload
    },
    setDeadline: (state, action) => {
      state.deadline = action.payload
    },
    addChoice: (state) => {
      state.choices.push('');
    },
    removeChoice: (state, action) => {
      state.choices.splice(action.payload - 1, 1);
      // console.log(action.payload);
    }
  }
})

export const {setTitle, setDescription, setDeadline, addChoice, removeChoice} = formPollSlice.actions;