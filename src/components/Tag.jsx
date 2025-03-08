import React from "react";

function Tag({ techstack,selectechtag,selectcolor }) {
   const defautcolor = selectcolor === "#E5E7EB";
  return (
    <button  type="button"
    style={{backgroundColor:selectcolor, color:defautcolor? "black": "white"}}
    className=" px-3 py-1 rounded-md  font-semibold hover:bg-gray-300 transition" onClick={() => selectechtag(techstack.title)}>
      {techstack.title}
    </button>
  );
}

export default Tag;
