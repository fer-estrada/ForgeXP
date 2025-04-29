import React from "react";
import { address } from "../../../address"; //update address here
console.log('address =>', address);     

export default function HomeIntro() {
  return (
    <div className="flex flex-col justify-center items-center text-center pb-12">
      <img
        src="/images/forgexp-logo.png"
        alt="ForgeXP Logo"
        className="w-32 h-auto mb-6 drop-shadow-xl forge-tilt"
      />
      <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-shadow-lg drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
        Welcome to ForgeXP
      </h1>
      <p className="text-gray-300 text-lg md:text-xl max-w-2xl">
        Connect with fellow players, upload and share content, and explore the
        ultimate gaming experience hub.
      </p>
    </div>
  );
}
