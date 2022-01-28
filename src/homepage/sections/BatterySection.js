import React, { useContext } from "react";
import { numberWithCommas } from "../../shared/util/format";
import bat from "../resources/bat.png";
import { HomeContext } from "../tabs/context/home-context";

const BatterySection = () => {
  const { batterytab } = useContext(HomeContext);
  console.log(batterytab);
  return (
    <>
      <div className="price-header">
        <h3 className="title">Battery</h3>
        <img src={bat} alt="Battery" />
      </div>
      <hr />
      <div className="price-body">
        <ul className="features">
          <li>Battery Type: {batterytab.batttype}</li>
          <li>Battery Model / Name: {batterytab.battname}</li>
          <li>Battery Voltage: {batterytab.voltage}</li>
          <li>Battery Capacity: {batterytab.battcapacity}</li>
          <li>
            Price per pc.: Php{" "}
            {batterytab.priceperpc &&
              numberWithCommas(batterytab.priceperpc.toFixed(2))}
          </li>
          <li>Total Number of Battery: {batterytab.totalqty}</li>
          <li>Battery Total Capacity: {batterytab.totalcapacity} Ah</li>
          <li>
            Total Price: Php{" "}
            {batterytab.totalprice &&
              numberWithCommas(batterytab.totalprice.toFixed(2))}
          </li>
        </ul>
      </div>
    </>
  );
};

export default BatterySection;
