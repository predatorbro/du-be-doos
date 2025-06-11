import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggleTodo: JSON.parse(localStorage.getItem("theme")) || false,
};

export const toggleTodoSlice = createSlice({
  name: "toggleTodo",
  initialState,
  reducers: {
    toggleTodoFunction: (state) => {
      state.toggleTodo = !state.toggleTodo;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleTodoFunction } = toggleTodoSlice.actions;

export default toggleTodoSlice.reducer;
