import React from "react";
import { SiderbarDropdown } from "./SidebarDropdown";
import { Button } from "@repo/ui/components/button";
import Link from "next/link";

const InventorySidebar = () => {
  return (
    <div className="h-screen flex flex-col text-white">
      <div className="flex flex-col border-2 border-primary m-2 h-full rounded-xl ">
        <div className="p-4 text-2xl space-y-2">
          <div className="flex flex-row">
            <h1 className="inline-block bg-gradient-to-r from-[#81C4FF] to-[#E7222E] bg-clip-text font-semibold text-transparent">
              TMB Inventory
            </h1>
          </div>
          <SiderbarDropdown />
        </div>
        <div className="mt-auto bottom-0 flex flex-col mx-2 my-2">
          <Button asChild>
            <Link href={"/apps"}>Go back to All Apps</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InventorySidebar;
