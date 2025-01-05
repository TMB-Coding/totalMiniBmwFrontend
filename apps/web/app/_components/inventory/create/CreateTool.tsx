import { Button } from "@repo/ui/components/button";

import { NotebookPen } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import ConditionDropdown from "../reusables/dropdowns/Condition";
import CabinetDropdown from "../reusables/dropdowns/Cabinet";
import ChassisInput from "./inputs/Chassis";
import BMWGroup from "./inputs/bmwGroup";
import BMWSubGroup from "./inputs/bmwSubGroup";
import DescriptionInput from "./inputs/Description";

import LocationInput from "./inputs/Location";
import ToolPreviewCard from "../reusables/ToolPreviewCard";
import ToolBoardInput from "./inputs/ToolBoard";

const CreateTool = () => {
  const [condition, setCondition] = useState<string>("");
  const [cabinet, setCabinet] = useState<string>("");
  const [bmwGroup, setBmwGroup] = useState<number | undefined>(undefined);
  const [bmwSubGroup, setBmwSubGroup] = useState<number | undefined>(undefined);
  const [chassis, setChassis] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [toolBoard, setToolBoard] = useState<string>("");

  return (
    <div className="flex flex-col w-full px-10 h-screen">
      <div className="flex flex-col border-[1px] border-primary h-full rounded-xl text-white w-full my-10">
        <div className="flex flex-row pt-6 px-5 items-center w-full">
          <h1 className="text-white font-semibold text-2xl flex flex-row items-center gap-3">
            <NotebookPen />
            Create Tool
          </h1>
          <Button
            asChild
            variant={"destructive"}
            className="ml-auto right-0 text-white"
          >
            <Link href={"/apps/app/inventory?view=home"}>Cancel</Link>
          </Button>
        </div>
        <hr className="bg-primary border-0  h-px my-6 rounded-xl" />
        <div className="flex flex-row px-5 mb-6 w-full items-center gap-3 justify-between">
          <div className="flex flex-row gap-3">
            <ConditionDropdown
              condition={condition}
              setCondition={setCondition}
            />
            <CabinetDropdown cabinet={cabinet} setCabinet={setCabinet} />
          </div>
          <div className="inline-block h-full mx-12 w-0.5 bg-primary"></div>
          <div className="flex flex-row gap-3">
            <Button variant={"outline"} className="text-black">
              +&nbsp; Image
            </Button>
            <Button
              variant={"ghost"}
              className="text-black border-white border-[1.8px] rounded-md text-white hover:bg-white hover:text-black"
            >
              +&nbsp; Laser File
            </Button>
          </div>
        </div>
        <hr className="bg-primary border-0  h-px rounded-xl mb-6" />
        <div className="w-full flex flex-row h-full px-5 gap-5">
          <div className="flex flex-row gap-3 w-full mb-auto top-0 flex-wrap">
            <ChassisInput chassis={chassis} setChassis={setChassis} />
            <BMWGroup bmwGroup={bmwGroup} setBMWGroup={setBmwGroup} />
            <BMWSubGroup
              bmwSubGroup={bmwSubGroup}
              setBMWSubGroup={setBmwSubGroup}
            />
            <DescriptionInput
              description={description}
              setDescription={setDescription}
            />
            <LocationInput location={location} setLocation={setLocation} />
            <ToolBoardInput toolBoard={toolBoard} setToolBoard={setToolBoard} />
          </div>
          <ToolPreviewCard />
        </div>
      </div>
    </div>
  );
};

export default CreateTool;
