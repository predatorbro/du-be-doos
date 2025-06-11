import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  // todos: [{ id: nanoid(), todo: "am du-be-doos!! ;)", status: false }],
  todos: JSON.parse(localStorage.getItem("todos")) || [
    { id: nanoid(), todo: "am du-be-doos!! ;)", status: false },
  ],
};

export const quickySlice = createSlice({
  name: "quicky",
  initialState,
  reducers: {
    addQuickees: (state, action) => {
      const tempTodo = {
        id: nanoid(),
        todo: action.payload,
        status: false,
      };
      state.todos.push(tempTodo);
    },
    editQuickees: (state, action) => {
      state.todos = state.todos.map((todo) => {
        return todo.id == action.payload.kee
          ? { ...todo, todo: action.payload.text }
          : todo;
      });
    },
    deleteQuickees: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    statusUpdate: (state, action) => {
      state.todos = state.todos.map((todo) => {
        return todo.id == action.payload
          ? { ...todo, status: !todo.status }
          : todo;
      });
      // console.log(JSON.parse(JSON.stringify(state.todos)));
    },
  },
});

// Action creators are generated for each case reducer function
export const { addQuickees, deleteQuickees, statusUpdate, editQuickees } =
  quickySlice.actions;

export default quickySlice.reducer;
