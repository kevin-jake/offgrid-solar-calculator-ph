import React from "react";
import Icon from "./Icon";

const SortDn = ({ className, active }) => {
  return (
    <Icon className={className} active={active}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
      />
    </Icon>
  );
};

export default SortDn;
