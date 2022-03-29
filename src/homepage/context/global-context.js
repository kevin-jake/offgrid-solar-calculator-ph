import React, { createContext, useReducer } from "react";

const initState = {
  voltage: 12,
  overallprice: {
    twelveV: 0,
    twentyfourV: 0,
    fortyeightV: 0,
  },
  totalbattcapacity: {
    totalcapacity: 0,
    battinseries: 0,
    battinparallel: 0,
    battvoltage: 0,
    battcapacity: 0,
    battsizeneed: 0,
    currentload: 0,
    powertoinverter: 0,
    totalprice: 0,
  },
  solarpanel: {
    pvname: "",
    pvparallel: 0,
    pvseries: 0,
    totalwattage: 0,
    totalnumberpv: 0,
    totalprice: 0,
  },
  scc: {
    sccname: "",
    type: "",
    amprating: 0,
    price: 0,
  },
  isValid: {
    inverter: {
      valid: true,
      message: "",
    },
    scc: {
      valid: true,
      message: "",
    },
    solarpanel: {
      valid: true,
      message: "",
    },
    battery: {
      valid: true,
      message: "",
    },
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
    case "SETPRICE":
      return {
        ...state,
        overallprice: action.overallprice,
      };
    case "SETVALID":
      return {
        ...state,
        isValid: action.isValid,
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

  const setOverallPrice = (price) => {
    dispatch({
      type: "SETPRICE",
      overallprice: price,
    });
  };

  const setValid = (validity) => {
    dispatch({
      type: "SETVALID",
      isValid: validity,
    });
  };

  const value = {
    voltage: state.voltage,
    overallprice: state.overallprice,
    totalbattcapacity: state.totalbattcapacity,
    solarpanel: state.solarpanel,
    scc: state.scc,
    isValid: state.isValid,
    setValid,
    setOverallPrice,
    setSCCGlobal,
    setSolarPanel,
    setVoltage,
    setBatteryCap,
  };
  // // console.log(state);
  return (
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider>
  );
};
