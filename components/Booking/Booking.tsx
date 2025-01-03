"use client"
import React, { useContext, useState, useEffect } from "react";
import AutocompleteAddress from "./AutocompleteAddress";
import Cars from "./Cars";
import Cards from "./Cards";
import { useRouter } from "next/navigation";
import { SelectedCarAmountContext } from "@/context/SelectedCarAmountContext";

function Booking() {
  const [screenHeight, setScreenHeight] = useState<number>(0);  // Khởi tạo state cho screenHeight
  const { carAmount, setCarAmount } = useContext(SelectedCarAmountContext);
  const router: any = useRouter();

  // Chỉ chạy sau khi component đã được mount trên client
  useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenHeight(window.innerHeight * 0.8);  // Lấy giá trị window.innerHeight
    }
  }, []);  // Chạy chỉ một lần sau khi component mount

  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Booking</h2>
      <div
        className="border-[1px] p-5 rounded-md"
        style={{ height: screenHeight }}  // Sử dụng giá trị screenHeight từ state
      >
        <AutocompleteAddress />
        <Cars />
        <Cards />
        <button
          className={`w-full bg-yellow-400 p-1 rounded-md mt-4 ${
            !carAmount ? "bg-gray-200" : null
          }`}
          onClick={() => router.push("/payment")}
        >
          Book
        </button>
      </div>
    </div>
  );
}

export default Booking;
