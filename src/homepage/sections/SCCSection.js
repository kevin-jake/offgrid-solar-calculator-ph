import React from "react";
import scc from "../resources/scc.png";

const SCCSection = () => {
  return (
    <>
      <div>
        <h3>Solar Charge Controller</h3>
        <img src={scc} alt="SCC" />
      </div>
      <div>
        <p>SCC Type:</p>
        <p>SCC Name:</p>
        <p>SCC Ampere Rating:</p>
        <p>Price:</p>
      </div>
    </>
  );
};

export default SCCSection;
