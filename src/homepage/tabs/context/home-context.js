import React, { createContext, useReducer } from "react";

const initialState = {
  loadtab: {
    itemState: {
      items: [
        {
          loadname: "TV",
          userqty: "2",
          wattage: "10",
          totalwatts: "",
          ophours: "4",
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
    id: "",
    battname: "",
    batttype: "",
    battmodel: "",
    voltage: 0,
    battcapacity: 0,
    priceperpc: 0,
    totalqty: 0,
    totalcapacity: 0,
    totalprice: 0,
    img: "",
    link: "",
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
  solarpanelstab: {
    id: "",
    pvname: "",
    wattage: 0,
    brand: "",
    voc: 0,
    imp: 0,
    isc: 0,
    price: 0,
    link: "",
    sunhours: 0,
  },
  scctab: {
    id: "",
    sccname: "",
    type: "",
    brand: "",
    supplier: "",
    amprating: 0,
    price: 0,
    img: "",
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
    case "BATT":
      return {
        ...state,
        batterytab: action.batterytab,
      };
    case "PV":
      return {
        ...state,
        solarpanelstab: action.solarpanelstab,
      };
    case "SCC":
      return {
        ...state,
        scctab: action.scctab,
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

  const setPV = (pvinfo) => {
    dispatch({
      type: "PV",
      solarpanelstab: pvinfo,
    });
  };

  const setSCC = (sccinfo) => {
    dispatch({
      type: "SCC",
      scctab: sccinfo,
    });
  };

  const value = {
    loadtab: state.loadtab,
    batterytab: state.batterytab,
    invertertab: state.invertertab,
    solarpanelstab: state.solarpanelstab,
    scctab: state.scctab,
    setSCC,
    setLoad,
    setBattery,
    setInverter,
    setPV,
  };
  // console.log(state);
  return (
    <HomeContext.Provider value={value}>{props.children}</HomeContext.Provider>
  );
};
