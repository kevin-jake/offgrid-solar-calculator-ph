import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { HomeContext } from "../../../homepage/context/home-context";
import { AuthContext } from "../../context/auth-context";
import ProfileCard from "./ProfileCard";

const NavLinks = () => {
  const { isLoggedIn, logout, email, name, role } = useContext(AuthContext);
  const { reset } = useContext(HomeContext);

  const handleLogout = () => {
    logout();
    reset();
  };

  return (
    <>
      <p className="mx-8 text-gray-700 transition-colors duration-200 transform dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500">
        <NavLink to="/" exact>
          Calculation
        </NavLink>
      </p>
      {isLoggedIn && (
        <>
          <p className="mx-8 text-gray-700 transition-colors duration-200 transform dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500">
            <NavLink to="/inverters" exact>
              Inverter List
            </NavLink>
          </p>
          <p className="mx-8 text-gray-700 transition-colors duration-200 transform dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500">
            <NavLink to="/batteries" exact>
              Battery List
            </NavLink>
          </p>
          <p className="mx-8 text-gray-700 transition-colors duration-200 transform dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500">
            <NavLink to="/solarpanels" exact>
              Solar Panel List
            </NavLink>
          </p>
          <p className="mx-8 text-gray-700 transition-colors duration-200 transform dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500">
            <NavLink to="/sccs" exact>
              SCC List
            </NavLink>
          </p>{" "}
        </>
      )}
      {!isLoggedIn && (
        <p className="block px-5 py-2 mt-4 font-medium leading-5 text-center text-white capitalize bg-blue-600 rounded-lg lg:mt-0 hover:bg-blue-500 lg:w-auto">
          <NavLink to="/auth">ATHENTICATE</NavLink>
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
