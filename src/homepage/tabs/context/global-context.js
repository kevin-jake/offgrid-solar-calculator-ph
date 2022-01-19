import React, { createContext, useReducer } from "react";

const initState = {
  voltage: 12,
  totalprice: 0,
  totalbattcapacity: 0,
};

const AppReducer = (state, action) => {
  switch (action.type) {
    case "SETV":
      return {
        ...state,
        voltage: action.voltage,
      };
    case "SETBATT":
      return {
        ...state,
        totalbattcapacity: action.totalbattcapacity,
      };
    default:
      return state;
  }
};

export const GlobalContext = createContext(initState);

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initState);

  const setVoltage = (voltage) => {
    dispatch({
      type: "SETV",
      voltage: voltage,
    });
  };

  const setBatteryCap = (battcap) => {
    dispatch({
      type: "SETBATT",
      totalbattcapacity: battcap,
    });
  };

  const value = {
    voltage: state.voltage,
    totalbattcapacity: state.totalbattcapacity,
    setVoltage,
    setBatteryCap,
  };
  console.log(state);
  return (
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider>
  );
};
