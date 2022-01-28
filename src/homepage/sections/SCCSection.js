import React, { useContext } from "react";
import { numberWithCommas } from "../../shared/util/format";
import sccimg from "../resources/scc.png";
import { GlobalContext } from "../tabs/context/global-context";

const SCCSection = () => {
  const { scc } = useContext(GlobalContext);
  return (
    <>
      <div className="price-header">
        <h3 className="title">Solar Charge Controller</h3>
        <img src={sccimg} alt="SCC" />
      </div>
      <hr />
      <div className="price-body">
        <ul className="features">
          <li>SCC Type: {scc.type}</li>
          <li>SCC Name: {scc.sccname}</li>
          <li>SCC Ampere Rating: {scc.amprating}</li>
          <li>Price: Php {numberWithCommas(scc.price.toFixed(2))}</li>
        </ul>
      </div>
    </>
  );
};

export default SCCSection;
