import React, { useState } from "react";
import SectionTitle from "./SectionTitle";
import Todos from "./BigTodos";
import { useDispatch } from "react-redux";
import { addNote, deleteSection, editTitle } from "../features/notezSlice";

function NewSection({ currSectionId, data, title }) {
  const [titleState, setTitleState] = useState(title);
  const dispatch = useDispatch();

  const onBtnClick = () => {
    dispatch(addNote(currSectionId));
  };

  const saveTitle = () => {
    dispatch(editTitle({ title: titleState, sectionID: currSectionId }));
  };

  const deleteSec = () => {
    const confirmation = window.confirm(`Do you want to delete ${titleState}?`);
    if (confirmation) dispatch(deleteSection(currSectionId));
  };

  return (
    <div className="box-border border max-h-fit transition-all mb-3 dark:bg-panelDark dark:border-borderDark bg-gray-200 border-gray-200 shadow-xl rounded-xl p-3">
      <SectionTitle
        onBtnClick={onBtnClick}
        classes="p-3 h-fit sm:text-2xl font-bold capitalize"
        value={titleState}
        onInputChange={(e) => setTitleState(e.target.value)}
        onBlur={saveTitle}
        specializedBtn={"Add"}
      >
        <button
          onClick={deleteSec}
          className="min-w-fit px-4 py-2 shadow-md text-white bg-red-600 hover:bg-red-700 rounded-lg flex gap-2 justify-center items-center"
        >
          Delete
        </button>
      </SectionTitle>

      <div className="flex flex-wrap gap-x-3 ">
        {[...data].reverse().map((note) => {
          return (
            currSectionId === note.sectionID && (
              // <div key={note.id} className="relative w-full">
              <Todos key={note.id} {...note} />
              // </div> 
            )
          );
        })}
      </div>
    </div>
  );
}

export default NewSection;
