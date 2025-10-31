import React from "react";
import Lottie from "lottie-react";
import busLoadingAnimation from "../assets/bus-loading.json";

const BusLoader = () => {
  return (
    <div className="text-center my-5">
      <div style={{ width: 200, margin: "0 auto" }}>
        <Lottie animationData={busLoadingAnimation} loop={true} />
      </div>
      <p className="mt-2">Loading buses, please wait...</p>
    </div>
  );
};

export default BusLoader;
