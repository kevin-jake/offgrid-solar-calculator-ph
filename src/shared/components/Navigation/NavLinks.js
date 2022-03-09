import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { HomeContext } from "../../../homepage/context/home-context";
import { AuthContext } from "../../context/auth-context";
import ProfileCard from "./ProfileCard";

const NavLinks = () => {
  const { isLoggedIn, logout, email, name, role } = useContext(AuthContext);
  const { reset } = useContext(HomeContext);
  const [active, setActive] = useState(1);

  const handleLogout = () => {
    logout();
    reset();
  };

  const handleActive = (option) => {
    setActive(option);
  };
  return (
    <>
      <p
        className={`mx-8 transition-colors duration-200 transform dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500 ${
          active === 1 ? "text-blue-500 font-bold" : "text-gray-700"
        }`}
      >
        <NavLink
          to="/"
          exact
          onClick={() => {
            handleActive(1);
          }}
        >
          Calculation
        </NavLink>
      </p>
      {isLoggedIn && (
        <>
          <p
            className={`mx-8 transition-colors duration-200 transform dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500 ${
              active === 2 ? "text-blue-500 font-bold" : "text-gray-700"
            }`}
          >
            <NavLink
              to="/inverters"
              exact
              onClick={() => {
                handleActive(2);
              }}
            >
              Inverter List
            </NavLink>
          </p>
          <p
            className={`mx-8 transition-colors duration-200 transform dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500 ${
              active === 3 ? "text-blue-500 font-bold" : "text-gray-700"
            }`}
          >
            <NavLink
              to="/batteries"
              exact
              onClick={() => {
                handleActive(3);
              }}
            >
              Battery List
            </NavLink>
          </p>
          <p
            className={`mx-8 transition-colors duration-200 transform dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500 ${
              active === 4 ? "text-blue-500 font-bold" : "text-gray-700"
            }`}
          >
            <NavLink
              to="/solarpanels"
              exact
              onClick={() => {
                handleActive(4);
              }}
            >
              Solar Panel List
            </NavLink>
          </p>
          <p
            className={`mx-8 transition-colors duration-200 transform dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500 ${
              active === 5 ? "text-blue-500 font-bold" : "text-gray-700"
            }`}
          >
            <NavLink
              to="/sccs"
              exact
              onClick={() => {
                handleActive(5);
              }}
            >
              SCC List
            </NavLink>
          </p>{" "}
        </>
      )}
      {!isLoggedIn && (
        <p className="block px-5 py-2 mt-4 font-medium leading-5 text-center text-white capitalize bg-blue-600 rounded-lg lg:mt-0 hover:bg-blue-500 lg:w-auto">
          <NavLink to="/auth">Login or Sign-Up</NavLink>
        </p>
      )}
      {isLoggedIn && (
        <ProfileCard name={name} email={email} role={role}>
          <div className="sec self-center p-2 w-2/8">
            <div className="buttons text-xs flex font-light">
              <button
                className="float-right px-5 py-2 mt-5 font-medium leading-5 text-center text-white capitalize bg-blue-600 rounded-lg lg:mt-0 hover:bg-blue-500 lg:w-auto"
                onClick={handleLogout}
              >
                LOGOUT
              </button>
            </div>{" "}
          </div>
        </ProfileCard>
      )}
    </>
  );
};

export default NavLinks;
