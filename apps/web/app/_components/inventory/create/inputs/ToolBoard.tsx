import { Input } from "@repo/ui/components/input";
import React from "react";

interface ToolBoardInputProps {
  toolBoard: string;
  setToolBoard: (value: string) => void;
}

const ToolBoardInput = ({ toolBoard, setToolBoard }: ToolBoardInputProps) => {
  return (
    <div className="flex flex-col">
      <h1 className="mb-2 text-sm text-white">Tool Board</h1>
      <Input
        maxLength={2}
        type={"number"}
        placeholder={"1"}
        onChange={(event) => setToolBoard(event.target.value)}
        value={toolBoard}
        className="border-primary placeholder:text-white/30 text-white"
      />
    </div>
  );
};

export default ToolBoardInput;
