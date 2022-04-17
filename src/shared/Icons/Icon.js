import React from "react";

const Icon = ({ children, size = 16, className, active = false }) => {
  return (
    <svg
      className={className}
      style={{ height: size, width: size }}
      fill="none"
      stroke={active ? "currentColor" : "lightgray"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
};

export default Icon;
