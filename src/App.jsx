import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import NotesSection from "./components/NotesSection";
import QuickTodos from "./components/QuickTodos";
import { useSelector, useDispatch } from "react-redux";
import { createNewSection } from "./features/notezSlice";
import MagicBtn from "./components/MagicBtn";
import { toggleDarkMode } from "./features/darkMode";
import { nanoid } from "@reduxjs/toolkit";

function App() {
  const dispatch = useDispatch();
  const allnotes = useSelector((state) => state.notez.notesContent);
  const alltitles = useSelector((state) => state.notez.notesTitle);
  const [toggleTodo, setToggleTodo] = useState(
    JSON.parse(localStorage.getItem("toggleTodo")) || false
  );

  useEffect(() => {
    localStorage.setItem("notesContent", JSON.stringify(allnotes));
    localStorage.setItem("notesTitle", JSON.stringify(alltitles));
  }, [allnotes, alltitles]);

  const clearAll = () => {
    if (window.confirm("Do you wanna clear all the notes?")) {
      localStorage.setItem("notesContent", "[]");
      localStorage.setItem("todos", "[]");
      localStorage.setItem("notesTitle", "[]");
      location.reload();
    }
  };

  const createNewSec = () => {
    dispatch(createNewSection());
  };

  // Dark mode system
  const theme = useSelector((state) => state.darkMode.theme);
  document.querySelector("html").classList.remove("dark", "light");
  document.querySelector("html").classList.add(theme ? "light" : "dark");
  localStorage.setItem("theme", theme);

  const changeTheme = () => {
    dispatch(toggleDarkMode());
  };

  const toggleTodoEvent = () => {
    setToggleTodo((prev) => !prev);
    localStorage.setItem("toggleTodo", !toggleTodo);
  };

  return (
    <>
      <Nav>
        <div className="flex gap-1 sm:gap-2 items-center">
          <button
            onClick={createNewSec}
            className="w-fit h-fit px-2 sm:text-base text-sm sm:px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg "
          >
            New Section
          </button>
          <button
            onClick={clearAll}
            className="w-fit px-2 text-sm sm:text-base sm:px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg flex gap-2 justify-center items-center"
          >
            Clear all
          </button>
        </div>
      </Nav>

      <br />

      <div className="flex md:flex-row flex-col gap-4 w-full min-h-[80vh] bg-transparent rounded-lg">
        {!toggleTodo && <QuickTodos />}

        <div className="flex flex-col gap-3 w-full transition-all">
          {alltitles.length > 0 &&
            [...alltitles]
              .reverse()
              .map((elem) => (
                <NotesSection
                  key={nanoid()}
                  currSectionId={elem.sectionID}
                  data={allnotes}
                  title={elem.title}
                />
              ))}
        </div>
      </div>

      <MagicBtn
        dependency={theme}
        clickEvent={changeTheme}
        trueElem={<i className="fa-regular fa-moon-stars"></i>}
        falseElem={<i className="fa-solid fa-moon-stars"></i>}
        classes="text-xl xs:left-6 xs:bottom-6 left-2 bottom-2 text-gray-600"
      />

      <MagicBtn
        dependency={toggleTodo}
        clickEvent={toggleTodoEvent}
        falseElem={<i className="fa-sharp fa-solid fa-eye"></i>}
        trueElem={<i className="fa-solid fa-eye-slash"></i>}
        classes="xs:left-6 xs:bottom-16 left-2 bottom-2 text-lg text-gray-600 hidden md:block"
      />
    </>
  );
}

export default App;
