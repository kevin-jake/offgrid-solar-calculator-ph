import React, { createContext, useReducer, useState } from "react";

const initialState = {
  loadtab: {
    itemState: {
      items: [
        {
          loadname: "",
          userqty: "",
          wattage: "",
          totalwatts: "",
          ophours: "",
          watthours: "",
        },
      ],
    },
    overalls: {
      totalwatts: 0,
      watthours: 0,
    },
  },
  batterytab: {
    itemState: {
      batteryname: "",
      leadAcidDOD: 0,
      lionDOD: 0,
      lifepoDOD: 0,
      totalCurrentLoad: 0,
      totalDCWattsInverter: 0,
    },
  },
  invertertab: {
    id: "",
    inverterName: "",
    type: "",
    inputVoltage: 0,
    efficiency: 0,
    wattage: 0,
    price: 0,
    link: "",
  },
};

const HomeReducer = (state, action) => {
  switch (action.type) {
    case "LOAD":
      return {
        ...state,
        loadtab: action.loadtab,
      };
    case "INV":
      return {
        ...state,
        invertertab: action.invertertab,
      };
    default:
      return state;
  }
};

export const HomeContext = createContext(initialState);

export const HomeProvider = (props) => {
  const [state, dispatch] = useReducer(HomeReducer, initialState);

  const setLoad = (loadinfo) => {
    dispatch({
      type: "LOAD",
      loadtab: loadinfo,
    });
  };

  const setBattery = (battinfo) => {
    dispatch({
      type: "BATT",
      batterytab: battinfo,
    });
  };

  const setInverter = (inverterinfo) => {
    dispatch({
      type: "INV",
      invertertab: inverterinfo,
    });
  };
  const value = {
    loadtab: state.loadtab,
    batterytab: state.batterytab,
    invertertab: state.invertertab,
    setLoad,
    setBattery,
    setInverter,
  };
  console.log(state);
  return (
    <HomeContext.Provider value={value}>{props.children}</HomeContext.Provider>
  );
};
