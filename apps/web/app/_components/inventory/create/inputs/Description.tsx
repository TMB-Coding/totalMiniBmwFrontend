import { Input } from "@repo/ui/components/input";
import React from "react";

interface DescriptionInputProps {
  description: string;
  setDescription: (value: string) => void;
}

const DescriptionInput = ({
  description,
  setDescription,
}: DescriptionInputProps) => {
  return (
    <div className="flex flex-col">
      <h1 className="mb-2 text-sm text-white">Description</h1>
      <Input
        placeholder={"Used for pressure testing the cooling system"}
        onChange={(event) => setDescription(event.target.value)}
        value={description}
        className="border-primary placeholder:text-white/30 text-white"
      />
    </div>
  );
};

export default DescriptionInput;
