import React from "react";

import "./Styling.scss";

const SectionHead = (props) => {
  return (
    <div className={`pricing-table-1 ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default SectionHead;
