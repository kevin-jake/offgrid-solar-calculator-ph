import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const isMobile = useMediaQuery({ query: `(max-width: 1011px)` });

  const DrawerHandler = () => {
    console.log(drawerIsOpen);
    !drawerIsOpen ? setDrawerIsOpen(true) : setDrawerIsOpen(false);
  };

  return (
    <MainHeader>
      <nav>
        <div className="container-lg p-6 bg-indigo-50 bg-opacity-30 shadow mx-auto lg:flex lg:justify-between lg:items-center">
          <div className="flex items-center justify-between">
            <div>
              <a
                className="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300"
                href="#"
              >
                <svg
                  className="inline-block h-16 w-16 text-yellow-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                Solar Calculator
              </a>
            </div>
            <div className="flex lg:hidden" onClick={DrawerHandler}>
              <button
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div
            className={
              drawerIsOpen || !isMobile
                ? "flex-col mt-4 items-center space-y-2 lg:mt-0 lg:flex-row lg:-px-8 lg:space-y-0 flex"
                : "hidden"
            }
          >
            <NavLinks />
          </div>
        </div>
      </nav>
    </MainHeader>
  );
};

export default MainNavigation;
