import React from "react";
import bat from "../resources/bat.png";

const BatterySection = () => {
  return (
    <>
      <div>
        <h3>Battery</h3>
        <img src={bat} alt="Battery" />
      </div>
      <div>
        <p>Battery Type:</p>
        <p>Battery Model / Name:</p>
        <p>Battery Voltage:</p>
        <p>Battery Capacity:</p>
        <p>Price per pc.:</p>
        <p>No. of Battery in Series:</p>
        <p>No. of Battery in Parallel:</p>
        <p>Total No. of Battery:</p>
        <p>Total Price:</p>
      </div>
    </>
  );
};

export default BatterySection;
