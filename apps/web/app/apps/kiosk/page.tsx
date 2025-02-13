"use client";
import { Input } from "@repo/ui/components/input";
import React, { useEffect, useRef } from "react";
import KioskHeader from "../../_components/kiosk/KioskHeader";

const KioskHome = () => {
  const barcodeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    barcodeInputRef.current?.focus();
  }, []);

  return (
    <div className="flex h-screen flex-col">
      <KioskHeader />
      <div className="flex h-full p-12 flex-row justify-between w-full">
        <div className="flex flex-col justify-center items-center mx-auto text-2xl gap-5">
          <h1 className="inline-block bg-gradient-to-r from-[#81C4FF] to-[#E7222E] bg-clip-text font-semibold text-transparent items-center">
            TMB Kiosk
          </h1>
          <Input
            ref={barcodeInputRef}
            placeholder={"Scan or input barcode"}
            className="bg-black text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default KioskHome;
