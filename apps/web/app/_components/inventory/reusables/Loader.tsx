import { cn } from "@repo/ui/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

interface LoaderProps {
  color?: string;
}

const Loader = ({ color }: LoaderProps) => {
  return (
    <Loader2
      className={cn(
        "justify-center h-full mx-auto animate-spin text-3xl text-white items-center",
        `text-${color}`
      )}
    />
  );
};

export default Loader;
