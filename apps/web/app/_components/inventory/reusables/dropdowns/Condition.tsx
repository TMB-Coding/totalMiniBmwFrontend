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

interface ConditionDropdownProps {
  setCondition: (v: string) => void;
  condition: string;
}

const ConditionDropdown = ({
  setCondition,
  condition,
}: ConditionDropdownProps) => {
  const handleSelectChange = (v: string) => {
    setCondition(v);
  };

  return (
    <div className="flex flex-col">
      <h1 className="mb-2 text-sm text-white">Condition</h1>

      <Select
        onValueChange={(value) => handleSelectChange(value)}
        defaultValue={condition}
        value={condition}
      >
        <SelectTrigger className="w-[180px] border-primary text-white/30">
          <SelectValue
            placeholder="Select a condition"
            className="text-white/20"
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Conditions</SelectLabel>
            <SelectItem value="okay">Okay</SelectItem>
            <SelectItem value="damaged">Damaged</SelectItem>
            <SelectItem value="broken">Broken</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ConditionDropdown;
