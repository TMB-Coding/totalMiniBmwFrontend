"use client";
import { Input } from "@repo/ui/components/input";
import React, { useEffect, useRef } from "react";
import KioskHeader from "../../_components/kiosk/KioskHeader";
import { useCookies } from "next-client-cookies";
import { Button } from "@repo/ui/components/button";
import { useToast } from "@repo/ui/hooks/use-toast";

const KioskHome = () => {
  const barcodeInputRef = useRef<HTMLInputElement>(null);
  const cookies = useCookies();
  const { toast } = useToast();

  useEffect(() => {
    barcodeInputRef.current?.focus();
  }, []);

  const handleSubmitPress = async () => {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/tool/kiosk`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cookies.get("jwt")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ barcode: barcodeInputRef.current?.value }),
      }
    );
    const res = await req.json();
    if (req.status != 200) {
      return toast({
        variant: "destructive",
        title: "Error:",
        description: <>{res.message}</>,
      });
    }
    toast({
      variant: "default",
      title: "Success:",
      description: <>{res.message}</>,
    });
  };

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
          <Button onClick={() => handleSubmitPress()}>Inventory</Button>
        </div>
      </div>
    </div>
  );
};

export default KioskHome;
