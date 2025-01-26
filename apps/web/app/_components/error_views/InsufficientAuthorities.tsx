import { CircleAlertIcon } from "lucide-react";
import React from "react";

interface InsufficientAuthoritiesProps {
  error: string;
}

const InsufficientAuthorities = ({ error }: InsufficientAuthoritiesProps) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center mx-auto h-full">
      <CircleAlertIcon className="text-destructive" />
      <h1 className="text-lg font-semibold text-white">Access Denied</h1>
      <h1 className="text-sm font-regular text-white/20">{error && error}</h1>
    </div>
  );
};

export default InsufficientAuthorities;
