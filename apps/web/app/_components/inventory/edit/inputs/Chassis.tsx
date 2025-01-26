import { Input } from "@repo/ui/components/input";
import React from "react";

interface ChassisInputProps {
  chassis: string;
  setChassis: (value: string) => void;
  ph: string;
}

const ChassisInput = ({ chassis, setChassis, ph }: ChassisInputProps) => {
  return (
    <div className="flex flex-col">
      <h1 className="mb-2 text-sm text-white">Chassis</h1>
      <Input
        placeholder={ph ?? ""}
        onChange={(event) => setChassis(event.target.value)}
        value={chassis}
        className="border-primary placeholder:text-white/30 text-white"
      />
    </div>
  );
};

export default ChassisInput;
