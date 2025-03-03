import React from "react";
import { SiderbarDropdown } from "./SidebarDropdown";
import { Button } from "@repo/ui/components/button";
import Link from "next/link";

const InventorySidebar = () => {
  return (
    <div className="min-h-screen flex flex-col text-white">
      <div className="flex flex-col border-2 border-primary m-2 h-full rounded-xl ">
        <div className="p-4 space-y-2">
          <div className="flex flex-col">
            <h1 className="font-thin text-white text-md">Total MINI & BMW</h1>
            <h1 className="font-semibold text-2xl text-white">Inventory</h1>
          </div>
          <SiderbarDropdown />
        </div>
        <div className="mt-auto bottom-0 flex flex-col mx-2 my-2">
          <Button
            asChild
            className="bg-black hover:bg-white border-white border-2 hover:text-black"
          >
            <Link href={"/apps"}>Go back to All Apps</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InventorySidebar;
