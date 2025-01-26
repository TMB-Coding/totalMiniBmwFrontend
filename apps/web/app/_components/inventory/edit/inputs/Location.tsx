import { Input } from "@repo/ui/components/input";
import React from "react";

interface LocationInputProps {
  location: string;
  setLocation: (value: string) => void;
  ph: string;
}

const LocationInput = ({ location, setLocation, ph }: LocationInputProps) => {
  return (
    <div className="flex flex-col">
      <h1 className="mb-2 text-sm text-white">Location</h1>
      <Input
        placeholder={ph ?? ""}
        onChange={(event) => setLocation(event.target.value)}
        value={location}
        className="border-primary placeholder:text-white/30 text-white"
      />
    </div>
  );
};

export default LocationInput;
