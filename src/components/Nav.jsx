import React from "react";

function Nav({ children }) {
  return (
    <>
      {/* <!-- nav bar --> */}
      <div className="shadow-md justify-between rounded-xl p-5 w-full flex items-center bg-gray-200 dark:bg-panelDark ">
        <h1 className="text-xl font-bold text-gray-800 dark:text-textPrimary">
          My du-be-doos! <i className="fa-solid fa-sparkles"></i>
        </h1>
        {children} 
      </div>
    </>
  );
}

export default Nav;
