import React from "react";
import Icon from "./Icon";

const SortUp = ({ className, active }) => {
  return (
    <Icon className={className} active={active}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
      />
    </Icon>
  );
};

export default SortUp;
