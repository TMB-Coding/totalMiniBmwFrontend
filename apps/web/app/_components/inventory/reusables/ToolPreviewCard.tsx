import { Button } from "@repo/ui/components/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/tooltip";
import { CarIcon, PinIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const ToolPreviewCard = () => {
  return (
    <div className="flex flex-col gap-2 ml-auto right-0 border-[1px] border-primary rounded-lg mb-5 min-w-[240px] max-w-[240px] h-min">
      <div className=" flex flex-col">
        <div className="text-white py-2 rounded-t-md px-3 py-3 bg-black">
          <Image
            className="rounded-md"
            width={300}
            height={170}
            src={
              "https://cdn.dribbble.com/userupload/4359856/file/original-540b3e4719e48c60340996f01deabb67.png?resize=752x&vertical=center"
            }
            alt="Preview Image"
          />
        </div>
        <div className="flex flex-col px-3">
          <div className="flex flex-row w-full  mt-4">
            <h1 className="text-white text-sm font-light mr-12">TB-12</h1>
            <div className="flex ml-auto right-0">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <h1 className="text-blue-500 text-sm font-normal truncate overflow-hidden w-16 cursor-pointer">
                      cm5iv7gh7000008mq83xq3ztv
                    </h1>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click to copy full ID</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="flex flex-col h-full">
            <h1 className="text-xl font-semibold mt-3">Piston Ring Remover</h1>
            <div className="flex flex-row mt-2 items-center">
              <div className="flex flex-col gap-1">
                <h1 className="text-xs text-white/30 font-normal">Chassis</h1>
                <div className="flex items-center flex-row gap-2">
                  <CarIcon size={20} />
                  <h1 className="text-xs text-white">E89</h1>
                </div>
              </div>
              <div className="flex flex-col gap-1 ml-auto right-0">
                <h1 className="text-xs text-white/30 font-normal">Group</h1>
                <div className="flex items-center flex-row">
                  <h1 className="text-xs text-white">21-11</h1>
                </div>
              </div>
            </div>
            <hr className="bg-primary border-0  h-px my-4 rounded-xl" />
            <div className="flex flex-col gap-2 h-full">
              <h1 className="text-xs text-white/30 font-normal">Description</h1>
              <h1 className="text-xs text-white/40 font-normal">
                This is a cool description of a very cool bmw specific tool used
                for all sorts of things like coolant pressure testing and such
              </h1>
              <Button>
                <h1 className="text-xs font-medium">...ngRemover.dxf</h1>
              </Button>
              <div className="flex flex-row items-center mt-auto bottom-0 mb-3">
                <div className="flex flex-col gap-1">
                  <h1 className="text-xs text-white/30 font-normal">
                    Location
                  </h1>
                  <div className="flex items-center flex-row gap-1">
                    <PinIcon size={20} />
                    <h1 className="text-xs text-white">Tool Room</h1>
                  </div>
                </div>
                <div className="flex flex-col gap-1 ml-auto right-0">
                  <h1 className="text-xs text-white/30 font-normal">Cabinet</h1>
                  <div className="flex items-center flex-row">
                    <h1 className="text-xs text-white">Cab1</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolPreviewCard;
