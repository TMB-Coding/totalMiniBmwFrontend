import { Input } from "@repo/ui/components/input";
import React from "react";

interface NameInputProps {
  name: string;
  setName: (value: string) => void;
  ph: string;
}

const NameInput = ({ name, setName, ph }: NameInputProps) => {
  return (
    <div className="flex flex-col">
      <h1 className="mb-2 text-sm text-white">Name</h1>
      <Input
        placeholder={ph ?? ""}
        onChange={(event) => setName(event.target.value)}
        value={name}
        className="border-primary placeholder:text-white/30 text-white"
      />
    </div>
  );
};

export default NameInput;
