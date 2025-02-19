"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import Home from "../../../_components/inventory/home/Home";
import CreateTool from "../../../_components/inventory/create/CreateTool";
import AccessControl from "../../../_components/inventory/access_control/AccessControl";
import EditTool from "../../../_components/inventory/edit/EditTool";
import { ViewAssets } from "../../../_components/inventory/home/table/ViewAssets";

const Inventory = () => {
  const router = useRouter();
  const view = useSearchParams().get("view");

  // if no search param is parsed, then append the default, "home"
  useEffect(() => {
    if (!view) return router.push("/apps/app/inventory?view=home");
  }, []);

  return (
    <div className="flex h-full w-full flex-col">
      {view && view == "home" && <Home />}

      {view && view == "mass_edits" && (
        <div className="text-white">Mass Edit</div>
      )}

      {view && view == "access_control" && <AccessControl />}

      {view && view == "create" && <CreateTool />}
      {view && view == "edit" && <EditTool />}
      <ViewAssets />
    </div>
  );
};

export default Inventory;
