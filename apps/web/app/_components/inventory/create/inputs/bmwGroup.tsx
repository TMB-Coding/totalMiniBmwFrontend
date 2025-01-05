import { Input } from "@repo/ui/components/input";
import React from "react";

interface BMWGroupProps {
  bmwGroup: number | undefined;
  setBMWGroup: (value: number | undefined) => void;
}

const BMWGroup = ({ bmwGroup, setBMWGroup }: BMWGroupProps) => {
  return (
    <div className="flex flex-col">
      <h1 className="mb-2 text-sm text-white">Group</h1>
      <Input
        type="text"
        maxLength={2}
        placeholder={"11"}
        onChange={(event) => setBMWGroup(Number.parseInt(event.target.value))}
        value={bmwGroup !== undefined && !isNaN(bmwGroup) ? bmwGroup : ""}
        className="border-primary placeholder:text-white/30 text-white"
        pattern="\d*"
      />
    </div>
  );
};

export default BMWGroup;
