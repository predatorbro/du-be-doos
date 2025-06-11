import React, { useEffect } from "react";
function MagicBtn({ dependency, clickEvent, trueElem, falseElem, classes }) {
  return (
    <div
      className={`" cursor-pointer 
       fixed dark:text-white transition"  ${classes}`}
      onClick={clickEvent}
    >
      {dependency ? trueElem : falseElem}
    </div>
  );
}

export default MagicBtn;
