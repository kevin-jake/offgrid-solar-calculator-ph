import React, { createContext, useReducer } from "react";

const initState = {
  voltage: 12,
  totalprice: 0,
  totalbattcapacity: {
    totalcapacity: 0,
    battinseries: 0,
    battinparallel: 0,
    battvoltage: 0,
    battcapacity: 0,
    battsizeneed: 0,
    currentload: 0,
    powertoinverter: 0,
  },
  solarpanel: {
    pvname: "",
    pvparallel: 0,
    pvseries: 0,
    totalnumberpv: 0,
    totalprice: 0,
  },
  scc: {
    sccname: "",
    type: "",
    amprating: "",
    price: 0,
  },
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
    case "SETPV":
      return {
        ...state,
        solarpanel: action.solarpanel,
      };
    case "SETSCC":
      return {
        ...state,
        scc: action.scc,
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

  const setSolarPanel = (pvinfo) => {
    dispatch({
      type: "SETPV",
      solarpanel: pvinfo,
    });
  };

  const setSCCGlobal = (sccinfo) => {
    dispatch({
      type: "SETSCC",
      scc: sccinfo,
    });
  };

  const value = {
    voltage: state.voltage,
    totalbattcapacity: state.totalbattcapacity,
    solarpanel: state.solarpanel,
    scc: state.scc,
    setSCCGlobal,
    setSolarPanel,
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
