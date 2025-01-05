import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import React from "react";

const cabinets: Array<string> = ["1", "2", "3", "4", "5", "6", "7", "8"];

interface ConditionDropdownProps {
  setCabinet: (v: string) => void;
  cabinet: string;
}

const CabinetDropdown = ({ setCabinet, cabinet }: ConditionDropdownProps) => {
  const handleSelectChange = (v: string) => {
    setCabinet(v);
  };

  return (
    <div className="flex flex-col">
      <h1 className="mb-2 text-sm text-white">Cabinet</h1>
      <Select
        onValueChange={(value) => handleSelectChange(value)}
        defaultValue={cabinet}
        value={cabinet}
      >
        <SelectTrigger className="w-[180px] border-primary text-white/30">
          <SelectValue
            placeholder="Select a cabinet"
            className="text-white/20"
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Cabinets</SelectLabel>
            {cabinets.map((cabinet, index) => (
              <SelectItem value={cabinet} key={index}>
                Cabinet {index + 1}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CabinetDropdown;
