import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: JSON.parse(localStorage.getItem("theme")) || false,
};

export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.theme = !state.theme;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleDarkMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;
