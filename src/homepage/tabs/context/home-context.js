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
};

const HomeReducer = (state, action) => {
  switch (action.type) {
    case "LOAD":
      return {
        ...state,
        loadtab: action.loadtab,
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

  const value = {
    loadtab: state.loadtab,
    setLoad,
  };
  console.log(state);
  return (
    <HomeContext.Provider value={value}>{props.children}</HomeContext.Provider>
  );
};
