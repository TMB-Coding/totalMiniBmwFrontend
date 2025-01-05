"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import Home from "../../../_components/inventory/home/Home";
import CreateTool from "../../../_components/inventory/create/CreateTool";

const Inventory = () => {
  const router = useRouter();
  const view = useSearchParams().get("view");

  // if no search param is parsed, then append the default, "home"
  useEffect(() => {
    if (!view) return router.push("/apps/app/inventory?view=home");
  }, []);

  return (
    <div className="flex h-screen w-full flex-col">
      {view && view == "home" && <Home />}

      {view && view == "mass_edits" && (
        <div className="text-white">Mass Edit</div>
      )}

      {view && view == "access_control" && (
        <div className="text-white">Access Control</div>
      )}

      {view && view == "create" && <CreateTool />}
    </div>
  );
};

export default Inventory;
