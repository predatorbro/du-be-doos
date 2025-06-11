import { configureStore } from "@reduxjs/toolkit";
import quickyReducer from "../features/quickySlice";
import notezReducer from "../features/notezSlice";
import darkModeReducer from "../features/darkMode";
import toggleTodoReducer from "../features/todoToggle";

export default configureStore({
  reducer: {
    quicky: quickyReducer,
    notez: notezReducer,
    darkMode: darkModeReducer,
    toggleTodo: toggleTodoReducer,
  },
});
