"use client";
import React from "react";
import AutocompleteAddress from "./AutocompleteAddress";
import Cars from "./Cars";

function Booking() {
    const screenHight = window.innerHeight * 0.72;
  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Booking</h2>
      <div className="border-[1px] p-5 rounded-md" style={{height: screenHight}}>
        <AutocompleteAddress />
        <Cars />
      </div>
    </div>
  );
}

export default Booking;
