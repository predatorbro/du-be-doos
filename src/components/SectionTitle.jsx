import React from "react";

function SectionTitle({
  value,
  placeholder,
  classes,
  onBtnClick,
  onInputChange,
  specializedBtn,
  children,
  ...props
}) {
  return (
    <div className="flex gap-3">
      <input
        type="text"
        value={value || ""}
        onChange={onInputChange}
        placeholder={placeholder}
        className={`${classes}  outline-none dark:bg-bgNodes dark:border-borderDark dark:text-textPrimary text-gray-600 bg-gray-50 w-full   rounded-lg shadow-md border border-gray-200`}
        {...props}
      />
      <button
        onClick={onBtnClick}
        className="min-w-fit px-4 py-2  shadow-md text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex gap-2 justify-center items-center"
      >
        {specializedBtn || (
          <>
            <i className="fa-sharp fa-solid fa-circle-plus"></i>
            <i className="fa-light fa-pipe"></i>
            <span>New</span>
          </>
        )}
      </button>
      {children}
    </div>
  );
}

export default SectionTitle;
