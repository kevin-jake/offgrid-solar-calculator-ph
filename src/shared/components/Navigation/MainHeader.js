import React from "react";
import "./MainHeader.css";

const MainHeader = (props) => {
  return (
    <header className="bg-white dark:bg-gray-800">{props.children}</header>
  );
};

export default MainHeader;
