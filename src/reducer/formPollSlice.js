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
    setChoices: (state, action) => {
      state.choices[action.payload.index] = action.payload.value;
    },
    addChoice: (state) => {
      state.choices.push('');
    },
    removeChoice: (state, action) => {
      state.choices.splice(action.payload, 1);
    },
    resetForm: (state) => {
      state.title = "";
      state.description = "";
      state.deadline = "";
      state.choices = ['', '']
    }
  }
})

export const {setTitle, setDescription, setDeadline, setChoices, addChoice, removeChoice, resetForm} = formPollSlice.actions;