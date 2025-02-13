import { UserIcon } from "lucide-react";
import React from "react";
import { UserDropdown } from "./UserDropdown";

const KioskHeader = () => {
  return (
    <div className="flex flex-row w-full">
      <UserDropdown />
    </div>
  );
};

export default KioskHeader;
