import React, { createContext, useReducer } from "react";

const initialState = {
  loadtab: {
    itemState: {
      items: [
        {
          loadname: "",
          userqty: 0,
          wattage: 0,
          totalwatts: 0,
          ophours: 0,
          watthours: 0,
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
    vmp: 0,
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
  dodTable: {
    leadacid: {
      battcapacity: 0,
      dodbattcap: 0,
      inverterpower: 0,
      totalCurrentLoad: 0,
      totalDCPower: 0,
    },
    lifepo: {
      battcapacity: 0,
      dodbattcap: 0,
      inverterpower: 0,
      totalCurrentLoad: 0,
      totalDCPower: 0,
    },
    lion: {
      battcapacity: 0,
      dodbattcap: 0,
      inverterpower: 0,
      totalCurrentLoad: 0,
      totalDCPower: 0,
    },
  },
  seriesParallelTable: {
    parallel: 0,
    series: 0,
    totalcapacity: 0,
    totalnumber: 0,
    totalprice: 0,
  },
  wiresize: {
    wireDetails: [
      {
        label: "Solar Panel to SCC",
        wiretype: "DC",
        price_per_meter: 0,
        length: 0,
        computedVdi: 0,
        suggestedAWG: "",
        totalprice: 0,
        awgAccepted: [],
      },
      {
        label: "SCC to Battery",
        wiretype: "DC",
        price_per_meter: 0,
        length: 0,
        computedVdi: 0,
        suggestedAWG: "",
        totalprice: 0,
        awgAccepted: [],
      },
      {
        label: "Battery to Inverter",
        wiretype: "DC",
        price_per_meter: 0,
        length: 0,
        computedVdi: 0,
        suggestedAWG: "",
        totalprice: 0,
        awgAccepted: [],
      },
      {
        label: "Inverter to Load",
        wiretype: "AC",
        price_per_meter: 0,
        length: 0,
        computedVdi: 0,
        suggestedAWG: "",
        totalprice: 0,
        awgAccepted: [],
      },
    ],
    wireSizingPrice: 0,
  },
  circuitBreaker: {
    data: [
      {
        label: "Solar Panel to SCC",
        breakertype: "DC",
        price: 0,
        computedSize: 0,
        breakerSize: 0,
      },
      {
        label: "SCC to Battery",
        breakertype: "DC",
        price: 0,
        computedSize: 0,
        breakerSize: 0,
      },
      {
        label: "Battery to Inverter",
        breakertype: "DC",
        price: 0,
        computedSize: 0,
        breakerSize: 0,
      },
      {
        label: "Inverter to Load",
        breakertype: "DC",
        price: 0,
        computedSize: 0,
        breakerSize: 0,
      },
    ],
    totalprice: 0,
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
    case "DOD":
      return {
        ...state,
        dodTable: action.dodTable,
      };
    case "SP":
      return {
        ...state,
        seriesParallelTable: action.seriesParallelTable,
      };
    case "WIRE":
      return {
        ...state,
        wiresize: action.wiresize,
      };
    case "CB":
      return {
        ...state,
        circuitBreaker: action.circuitBreaker,
      };
    case "reset":
      const stateSet = action.initState;
      stateSet.loadtab = {
        itemState: {
          items: [
            {
              loadname: "",
              userqty: 0,
              wattage: 0,
              totalwatts: 0,
              ophours: 0,
              watthours: 0,
            },
          ],
        },
        overalls: {
          totalwatts: 0,
          watthours: 0,
        },
      };
      // stateSet.wiresize = {};
      return stateSet;
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

  const setDOD = (dodtable) => {
    dispatch({
      type: "DOD",
      dodTable: dodtable,
    });
  };

  const setSP = (sptable) => {
    dispatch({
      type: "SP",
      seriesParallelTable: sptable,
    });
  };

  const setWireSize = (wiresize) => {
    dispatch({
      type: "WIRE",
      wiresize: wiresize,
    });
  };

  const setCB = (circuitBreaker) => {
    dispatch({
      type: "WIRE",
      circuitBreaker: circuitBreaker,
    });
  };

  const reset = () => {
    dispatch({
      type: "reset",
      initState: initialState,
    });
  };

  const value = {
    loadtab: state.loadtab,
    batterytab: state.batterytab,
    invertertab: state.invertertab,
    solarpanelstab: state.solarpanelstab,
    scctab: state.scctab,
    seriesParallelTable: state.seriesParallelTable,
    dodTable: state.dodTable,
    wiresize: state.wiresize,
    circuitBreaker: state.circuitBreaker,
    reset,
    setCB,
    setWireSize,
    setDOD,
    setSP,
    setSCC,
    setLoad,
    setBattery,
    setInverter,
    setPV,
  };
  // // console.log(state);
  return (
    <HomeContext.Provider value={value}>{props.children}</HomeContext.Provider>
  );
};
