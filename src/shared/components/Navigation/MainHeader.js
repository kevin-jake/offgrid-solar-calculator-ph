import React from "react";

const MainHeader = (props) => {
  return (
    <header className="bg-white dark:bg-gray-800">{props.children}</header>
  );
};

export default MainHeader;
