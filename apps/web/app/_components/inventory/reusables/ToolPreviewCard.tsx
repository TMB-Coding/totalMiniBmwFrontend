import { Button } from "@repo/ui/components/button";
import { Skeleton } from "@repo/ui/components/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/tooltip";
import { CarIcon, PinIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface ToolPreviewCardProps {
  name: string;
  toolBoard: string;
  imageUrl: string | null;
  lsrFileName: string | null;
  chassis: string;
  bmwSubGroup: number | undefined;
  bmwGroup: number | undefined;
  description: string;
  location: string;
  cabinet: string;
}

const ToolPreviewCard = ({
  name,
  toolBoard,
  imageUrl,
  chassis,
  bmwGroup,
  bmwSubGroup,
  description,
  location,
  cabinet,
  lsrFileName,
}: ToolPreviewCardProps) => {
  const [previewImageIsAccessable, setPreviewImageIsAccessable] =
    useState<boolean>(false);

  const [laserFileIsAccessable, setLaserFileIsAccessable] =
    useState<boolean>(false);

  useEffect(() => {
    const isImageAccessable = async () => {
      // if image has been uploaded, dont try and query yet but set
      // accessable to true;
      //if (imageUrl?.includes("blob")) return setPreviewImageIsAccessable(true);
      const response = await fetch(imageUrl as string, {
        method: "HEAD",
      });

      setPreviewImageIsAccessable(response.status == 404 ? false : true);
    };
    isImageAccessable();

    const isLaserFileAccessable = async () => {
      // eventually update to support multiple laser files (laser assets).
      const response = await fetch((imageUrl as string) + "_LASER", {
        method: "HEAD",
      });

      setLaserFileIsAccessable(response.status == 404 ? false : true);
    };
    isLaserFileAccessable();
  }, [imageUrl]);
  return (
    <div className="flex flex-col gap-2 ml-auto right-0 border-[1px] border-primary rounded-lg mb-5 min-w-[240px] max-w-[240px] flex-grow">
      <div className=" flex flex-col h-">
        <div className="text-white py-2 rounded-t-md px-3 py-3 bg-black">
          {!previewImageIsAccessable || !imageUrl ? (
            <Skeleton className="h-[170px] rounded-xl bg-gray-800" />
          ) : (
            <Image
              className="rounded-md"
              width={300}
              height={170}
              src={imageUrl}
              alt="Preview Image"
            />
          )}
        </div>
        <div className="flex flex-col px-3">
          <div className="flex flex-row w-full  mt-4">
            {!toolBoard ? (
              <div className="space-y-2 items-center">
                <Skeleton className="h-4 w-[70px] bg-gray-800" />
              </div>
            ) : (
              <h1 className="text-white text-sm font-light mr-12">
                TB-{toolBoard}
              </h1>
            )}
            {/* <div className="flex ml-auto right-0">
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
            </div> */}
          </div>
          <div className="flex flex-col h-full">
            {!name ? (
              <div className="space-y-2 items-center">
                <Skeleton className="h-4  bg-gray-800 mt-3" />
                <Skeleton className="h-4 w-[100px] bg-gray-800" />
              </div>
            ) : (
              <h1 className="text-xl font-semibold mt-3">{name}</h1>
            )}
            <div className="flex flex-row mt-2 items-center">
              {!chassis ? (
                <Skeleton className="h-4 w-[70px] bg-gray-800" />
              ) : (
                <div className="flex flex-col gap-1">
                  <h1 className="text-xs text-white/30 font-normal">Chassis</h1>
                  <div className="flex items-center flex-row gap-2">
                    <CarIcon size={20} />
                    <h1 className="text-xs text-white">{chassis}</h1>
                  </div>
                </div>
              )}
              <div className="flex flex-col gap-1 ml-auto right-0">
                {!bmwGroup || !bmwSubGroup ? (
                  <Skeleton className="h-4 w-[70px] bg-gray-800" />
                ) : (
                  <>
                    <h1 className="text-xs text-white/30 font-normal">Group</h1>
                    <div className="flex items-center flex-row">
                      <h1 className="text-xs text-white">
                        {bmwGroup}-{bmwSubGroup}
                      </h1>
                    </div>
                  </>
                )}
              </div>
            </div>
            <hr className="bg-primary border-0  h-px my-4 rounded-xl" />
            <div className="flex flex-col gap-2 h-full">
              {!description ? (
                <Skeleton className="h-[100px] rounded-xl bg-gray-800" />
              ) : (
                <>
                  <h1 className="text-xs text-white/30 font-normal">
                    Description
                  </h1>
                  <h1 className="text-xs text-white/40 font-normal">
                    {description}
                  </h1>
                </>
              )}
              {!laserFileIsAccessable && !lsrFileName ? (
                <Skeleton className="h-[35px] rounded-xl bg-gray-800" />
              ) : (
                <Button>
                  <h1 className="text-xs font-medium">Laser File Uploaded</h1>
                </Button>
              )}
              <div className="flex flex-row items-center mt-auto bottom-0 mb-3">
                {!location ? (
                  <Skeleton className="h-4 w-[70px] bg-gray-800" />
                ) : (
                  <div className="flex flex-col gap-1">
                    <h1 className="text-xs text-white/30 font-normal">
                      Location
                    </h1>
                    <div className="flex items-center flex-row gap-1">
                      <PinIcon size={20} />
                      <h1 className="text-xs text-white">{location}</h1>
                    </div>
                  </div>
                )}
                <div className="flex flex-col gap-1 ml-auto right-0">
                  {!cabinet ? (
                    <Skeleton className="h-4 w-[70px] bg-gray-800" />
                  ) : (
                    <>
                      <h1 className="text-xs text-white/30 font-normal">
                        Cabinet
                      </h1>
                      <div className="flex items-center flex-row">
                        <h1 className="text-xs text-white">{cabinet}</h1>
                      </div>
                    </>
                  )}
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
