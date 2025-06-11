import React, { useState, useEffect, useMemo } from "react";
import Quickees from "./Quickees";
import SectionTitle from "./SectionTitle";
import { useSelector, useDispatch } from "react-redux";
import { addQuickees } from "../features/quickySlice";

function QuickTodos() {
  const allQuickees = useSelector((state) => state.quicky.todos);
  const [miniTodo, setMiniTodo] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(allQuickees));
  }, [allQuickees]);

  const newQuickees = () => {
    if (!miniTodo) {
      alert("Empty note can't be saved!");
    } else {
      dispatch(addQuickees(miniTodo));
      setMiniTodo("");
    }
  };

  return (
    <div className="relative md:min-w-[40%] lg:min-w-[35%] dark:bg-panelDark dark:text-textPrimary dark:border-borderDark border bg-gray-200 border-gray-200 rounded-lg shadow-xl p-3 flex gap-3 flex-col h-fit transition-all">
      <SectionTitle
        placeholder="New Quickees..."
        value={miniTodo}
        classes="p-3"
        onBtnClick={newQuickees}
        onInputChange={(e) => setMiniTodo(e.target.value)}
        specializedBtn="Add"
      />

      {allQuickees.length > 0 && (
        <div className="flex flex-col gap-3">
          {allQuickees.map((quickees) => (
            <Quickees
              key={quickees.id}
              kee={quickees.id}
              todo={quickees.todo}
              status={quickees.status}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default QuickTodos;
