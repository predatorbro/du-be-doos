import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  notesTitle: JSON.parse(localStorage.getItem("notesTitle")) || [
    {
      sectionID: "123",
      title: "plan for next weekend",
    },
  ],
  notesContent: JSON.parse(localStorage.getItem("notesContent")) || [
    {
      id: nanoid(),
      sectionID: "123",
      subTitle: "Plans for the next weekend",
      note: " Plan a movie night with friends or family. On Sunday, begin with yoga or meditation for relaxation. Visit a local market or museum to explore. Dedicate time for meal prepping and planning for the week ahead. End the weekend with some light journaling and reflection.",
      date: "2025-01-25",
    },
  ],
};

export const notezSlice = createSlice({
  name: "notez",
  initialState,
  reducers: {
    addNote: (state, action) => {
      const tempTodo = {
        id: nanoid(),
        sectionID: action.payload,
        subTitle: "",
        note: "",
        date: "",
      };
      state.notesContent.push(tempTodo);
    },
    editNote: (state, action) => {
      state.notesContent = state.notesContent.map((note) => {
        return note.id == action.payload.id
          ? { ...note, note: action.payload.Note }
          : note;
      });
      console.log(state.notesContent);
    },
    editDate: (state, action) => {
      // console.log(action.payload);
      state.notesContent = state.notesContent.map((note) => {
        return note.id == action.payload.id
          ? { ...note, date: action.payload.Date }
          : note;
      });
      // console.log(state.notesContent);
    },
    deleteNote: (state, action) => {
      state.notesContent = state.notesContent.filter(
        (note) => note.id !== action.payload
      );
    },
    editSubtitle: (state, action) => {
      // console.log(action.payload);
      state.notesContent = state.notesContent.map((note) => {
        return note.id == action.payload.id
          ? { ...note, subTitle: action.payload.subtitle }
          : note;
      });
      // console.log(state.notesContent);
    },
    createNewSection: (state) => {
      const newSection = {
        id: nanoid(),
        sectionID: nanoid(),
        subTitle: "",
        note: "",
        date: "",
      };
      const newTitle = {
        sectionID: newSection.sectionID,
        title: "Section Title",
      };
      state.notesContent.push(newSection);
      state.notesTitle.push(newTitle);
    },
    editTitle: (state, action) => {
      state.notesTitle = state.notesTitle.map((elem) => {
        return elem.sectionID == action.payload.sectionID
          ? { ...elem, title: action.payload.title }
          : elem;
      });
    },
    deleteSection: (state, action) => {
      state.notesTitle = state.notesTitle.filter(
        (elem) => elem.sectionID !== action.payload
      );
      state.notesContent = state.notesContent.filter(
        (note) => note.sectionID !== action.payload
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNote,
  deleteNote,
  editNote,
  editSubtitle,
  editDate,
  editTitle,
  createNewSection,
  deleteSection,
} = notezSlice.actions;

export default notezSlice.reducer;
