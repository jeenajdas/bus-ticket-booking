import React from "react";
import Lottie from "lottie-react";
import busLoadingAnimation from "../assets/bus-loading.json";

const BusLoader = () => {
  return (
    <div className="text-center my-20">
      <div className="w-[240px] mx-auto filter drop-shadow-2xl">
        <Lottie animationData={busLoadingAnimation} loop={true} />
      </div>
      <p className="mt-8 text-xs font-black text-slate-400 uppercase tracking-[0.3em] italic animate-pulse">Synchronizing Fleet Availability...</p>
    </div>
  );
};

export default BusLoader;
