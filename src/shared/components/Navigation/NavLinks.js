import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const NavLinks = (props) => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  return (
    <>
      <p className="mx-8 text-gray-700 transition-colors duration-200 transform dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500">
        <NavLink to="/" exact>
          Calculation
        </NavLink>
      </p>
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
      </p>
      {/* {isLoggedIn && (
        <>
          <p>
            <NavLink to="/u1/places">MY PLACES</NavLink>
          </p>
          <p>
            <NavLink to="/places/new">NEW PLACES</NavLink>
          </p>
        </>
      )} */}
      {!isLoggedIn && (
        <p className="block px-5 py-2 mt-4 font-medium leading-5 text-center text-white capitalize bg-blue-600 rounded-lg lg:mt-0 hover:bg-blue-500 lg:w-auto">
          <NavLink to="/auth">ATHENTICATE</NavLink>
        </p>
      )}
      {isLoggedIn && (
        <p className="block px-5 py-2 mt-4 font-medium leading-5 text-center text-white capitalize bg-blue-600 rounded-lg lg:mt-0 hover:bg-blue-500 lg:w-auto">
          <button onClick={logout}>LOGOUT</button>
        </p>
      )}
    </>
  );
};

export default NavLinks;
