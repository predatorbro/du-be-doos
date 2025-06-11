import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteQuickees,
  editQuickees,
  statusUpdate,
} from "../features/quickySlice";

// URL detection regex
const urlRegex = /(https?:\/\/[^\s]+)/g;

function Quickees({ kee, todo, status }) {
  const [text, setText] = useState(todo);
  const [editable, setEditable] = useState(false);
  const dispatch = useDispatch();

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

  const checkStatus = () => {
    dispatch(statusUpdate(kee));
  };

  const deleteQuickee = () => {
    dispatch(deleteQuickees(kee));
  };

  const editBtn = () => {
    if (status) return;
    if (editable) {
      dispatch(editQuickees({ text, kee }));
      setEditable((prev) => !prev);
    } else {
      setEditable((prev) => !prev);
    }
  };

  const inputRef = useRef(null);
  useEffect(() => {
    if (editable) {
      inputRef.current.focus();
    }
  }, [editable]);

  return (
    <div
      key={kee}
      className={` group  
        ${status ? "bg-green-300" : "bg-red-200  hover:bg-red-300 dark:bg-bgNodes   dark:hover:bg-bgHover"} 
        dark:border-borderDark
        border border-gray-200 rounded-lg shadow-md p-3 flex gap-3 items-center `}
    >
      <input
        type="checkbox"
        checked={status}
        onChange={checkStatus}
        className="h-5 w-5"
        id=""
      />

      {editable ? (
        <input
          ref={inputRef}
          type="text"
          className={`
                    ${
                      status
                        ? "bg-green-300 text-green-800"
                        : "bg-red-200   group-hover:bg-red-300  text-red-800 dark:bg-bgNodes dark:text-gray-300  dark:group-hover:bg-bgHover"
                    } 
            text-base outline-none p-1 rounded  w-full`}
          value={text || ""}
          disabled={!editable}
          onChange={(e) => setText(e.target.value)}
        />
      ) : (
        <div
          className={`
                    ${
                      status
                        ? "bg-green-300 text-green-800"
                        : "bg-red-200   group-hover:bg-red-300  text-red-800 dark:bg-bgNodes dark:text-gray-300  dark:group-hover:bg-bgHover"
                    } 
            text-base outline-none p-1 rounded  w-full`}
        >
          {text ? renderTextWithLinks(text) : <span className="text-gray-400">Add a quick note...</span>}
        </div>
      )}

      <div className="flex space-x-2  ">
        <button
          onClick={editBtn}
          className={` ${
            status ? "hidden" : "block"
          } px-2 py-1 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200`}
        >
          {editable ? (
            <i className="fa-regular fa-floppy-disk"></i>
          ) : (
            <i className="fa-regular fa-pen"></i>
          )}
        </button>
        <button
          onClick={deleteQuickee}
          className="px-2 py-1 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200"
        >
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
  );
}

export default Quickees;
