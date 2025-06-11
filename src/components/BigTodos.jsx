import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  deleteNote,
  editDate,
  editNote,
  editSubtitle,
} from "../features/notezSlice";

// URL detection regex
const urlRegex = /(https?:\/\/[^\s]+)/g;

function Todos({ id, subTitle, note, date }) {
  const [boxStyle, setboxStyle] = useState({});
  const [subtitle, setSubtitle] = useState(subTitle);
  const [Note, setNote] = useState(note);
  const [Date, setDate] = useState(date);
  const [noteEditable, setNoteEditable] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // Track focus state for copy button visibility
  const dispatch = useDispatch();

  const updateBoxStyle = () => {
    if (window.innerWidth < 1200) {
      setboxStyle({});
    } else {
      setboxStyle({ flex: "1 1 calc(50% - 0.5rem)" });
    }
  };

  useEffect(() => {
    // Initial style update on load
    updateBoxStyle();

    // Add event listeners
    window.addEventListener("resize", updateBoxStyle);
    window.addEventListener("load", updateBoxStyle);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("resize", updateBoxStyle);
      window.removeEventListener("load", updateBoxStyle);
    };
  }, []);

  const subTitleChange = () => {
    dispatch(editSubtitle({ id, subtitle: subtitle }));
  };

  const dateChange = (e) => {
    setDate(e.target.value);
    dispatch(editDate({ id, Date: e.target.value }));
  };

  const delBtn = () => {
    if (window.confirm("Are you sure you want to delete this note?")) dispatch(deleteNote(id));
  };

  const editBtn = () => {
    if (noteEditable) {
      dispatch(editNote({ id, Note }));
      setNoteEditable((prev) => !prev);
    } else {
      setNoteEditable((prev) => !prev);
    }
  };

  const textAreaRef = useRef(null);

  useEffect(() => {
    if (noteEditable) {
      textAreaRef.current.focus();
    }
  }, [noteEditable]);

  function autoResize() {
    const textareas = document.querySelectorAll(".titleTextarea");
    textareas.forEach((textarea) => {
      textarea.style.height = "auto"; // Reset the height
      textarea.style.height = `${textarea.scrollHeight}px`; // Adjust based on scrollHeight
    });
  }

  setTimeout(() => {
    autoResize();
  }, 1);

  useEffect(() => {
    autoResize();
  }, [subtitle, Note, subTitle, note, Date]);

  const [buttonText, setButtonText] = useState(
    <i className="fa-regular fa-copy"></i>
  );

  const copyToClipboard = () => {
    if (Note) {
      navigator.clipboard.writeText(Note);
      setButtonText("Copied!");
      setTimeout(() => {
        setButtonText(<i className="fa-regular fa-copy"></i>);
      }, 3000);
    }
  };

  // Function to convert text with URLs to clickable links
  const renderTextWithLinks = (text) => {
    if (!text) return '';
    
    const parts = text.split(urlRegex);
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline break-all"
            onClick={(e) => e.stopPropagation()}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <>
      <div
        key={id}
        style={boxStyle}
        className="group w-full h-fit mt-3 bg-gray-100 border dark:bg-bgNodes dark:border-borderDark border-gray-300 rounded-lg shadow-lg p-3 pb-2 flex gap-1 flex-col relative  "
      >
        {/* <!-- top section --> */}
        <div className="flex justify-items-start items-start xs:justify-between xs:flex-row flex-col-reverse gap-1 xs:items-center">
          {/* <!-- title --> */}
          <textarea
            placeholder="Your title here..."
            value={subtitle}
            rows={1}
            onChange={(e) => setSubtitle(e.target.value)}
            onBlur={subTitleChange}
            className="titleTextarea dark:text-textPrimary overflow-hidden resize-none box-border p-1 outline-none w-full dark:bg-bgNodes bg-gray-100 font-semibold text-base text-gray-600"
          ></textarea>
          {/* <!-- btns --> */}
          <div className="flex w-fit gap-1 items-center justify-center h-full ">
            <input
              type="date"
              className={`${Date && "w-full"
                } w-[35px] myDate h-[32px] text-[0.75rem] outline-none border px-2 rounded-lg bg-green-50 hover:bg-green-100 border-green-200 hover:w-full`}
              value={Date}
              onChange={dateChange}
            />
            <button
              onClick={editBtn}
              className="px-2 py-1 max-h-fit text-blue-600 text-sm bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200"
            >
              {noteEditable ? (
                <i className="fa-regular fa-floppy-disk"></i>
              ) : (
                <i className="fa-regular fa-pen"></i>
              )}
            </button>
            <button
              onClick={delBtn}
              className="px-2 py-1 text-sm max-h-fit text-red-600 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200"
            >
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
        {/* <!-- line bar --> */}
        <hr className="xs:w-[70%]  border-t-1  bg-gray-300  " />
        {/* <!-- context --> */}
        <div className="text mt-1">
          {noteEditable ? (
            <textarea
              placeholder="Description goes here..."
              ref={textAreaRef}
              disabled={!noteEditable}
              onChange={(e) => setNote(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="titleTextarea overflow-hidden resize-none p-1 outline-1 outline-gray-400 dark:outline-borderDark w-full bg-gray-100 dark:bg-bgNodes dark:text-gray-300 text-base text-gray-800 min-h-20"
              value={Note}
            />
          ) : (
            <div 
              className="titleTextarea overflow-hidden resize-none p-1 outline-1 outline-gray-400 dark:outline-borderDark w-full bg-gray-100 dark:bg-bgNodes dark:text-gray-300 text-base text-gray-800 min-h-20 whitespace-pre-wrap"
            >
              {Note ? renderTextWithLinks(Note) : <span className="text-gray-400">Description goes here...</span>}
            </div>
          )}

          {/* <!-- Copy Button --> */}
          <div className="flex gap-3 text-xs items-center justify-between">
            <button
              onClick={copyToClipboard}
              className="bg-gray-600 dark:bg-gray-200 hover:bg-gray-700 dark:hover:bg-gray-300 dark:text-gray-700 text-gray-300  px-2 py-1 rounded"
            >
              {buttonText}
            </button>
            <div className="flex gap-3 text-gray-600 dark:text-gray-300">
              <p className="">Chars : {Note?.length || 0}</p>
              <p className=" ">
                Words :{" "}
                {Note?.trim() ? Note.trim().split(" ").length : 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todos;
