import React from "react";

const SectionHead = (props) => {
  return (
    <div className={`${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default SectionHead;
