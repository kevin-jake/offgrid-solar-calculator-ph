import React, { useContext } from "react";
import { numberWithCommas } from "../../shared/util/format";
import sccimg from "../resources/scc.png";
import { GlobalContext } from "../tabs/context/global-context";

const SCCSection = () => {
  const { scc } = useContext(GlobalContext);
  return (
    <>
      <div>
        <h3>Solar Charge Controller</h3>
        <img src={sccimg} alt="SCC" />
      </div>
      <div>
        <p>SCC Type: {scc.type}</p>
        <p>SCC Name: {scc.sccname}</p>
        <p>SCC Ampere Rating: {scc.amprating}</p>
        <p>Price: Php {numberWithCommas(scc.price.toFixed(2))}</p>
      </div>
    </>
  );
};

export default SCCSection;
