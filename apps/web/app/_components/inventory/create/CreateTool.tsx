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
import NameInput from "./inputs/Name";
import ImageUpload from "./create_tool/ImageUpload";
import { useCookies } from "next-client-cookies";
import { useToast } from "@repo/ui/hooks/use-toast";
import { useRouter } from "next/navigation";
import LaserFileUpload from "./create_tool/LaserFileUpload";

interface ErrorObj {
  field: string;
  message: string;
}

const CreateTool = () => {
  const cookies = useCookies();
  const { toast } = useToast();
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [condition, setCondition] = useState<string>("");
  const [cabinet, setCabinet] = useState<string>("");
  const [bmwGroup, setBmwGroup] = useState<number | undefined>(undefined);
  const [bmwSubGroup, setBmwSubGroup] = useState<number | undefined>(undefined);
  const [chassis, setChassis] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [toolBoard, setToolBoard] = useState<string>("");

  const [imageBlob, setImageBlob] = useState<Blob | null>(null);

  const [laserFileBlob, setLaserFileBlob] = useState<Blob | null>(null);
  const [laserFileName, setLaserFileName] = useState<string>("");

  const handleCreateTool = async () => {
    try {
      const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tool/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("jwt")}`,
        },
        body: JSON.stringify({
          name,
          condition: condition.toUpperCase(),
          cabinet,
          bmwGroup,
          bmwSubGroup,
          chassis,
          description,
          location,
          toolBoard,
        }),
      });
      const res = await req.json();
      if (req.status == 400) {
        return toast({
          variant: "destructive",
          title: "Error:",
          description: (
            <>
              {res.errors.map((error: ErrorObj) => (
                <p key={error.field}>{error.message}</p>
              ))}
            </>
          ),
        });
      }
      if (req.status == 500) {
        return toast({
          variant: "destructive",
          title: "Access Denied",
          description:
            "Your granted authorities are insufficient to access this resource.",
        });
      }
      router.push("/apps/app/inventory?view=home");
      toast({
        variant: "default",
        title: "Success",
        description:
          "Tool created successfully. If files we're uploaded, they are pending upload and you will be notified..",
      });

      // image upload
      if (imageBlob) {
        const formDataImage = new FormData();
        formDataImage.append("image", imageBlob);
        formDataImage.append("toolId", res.id);
        // tool image upload
        const req2 = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/s3/upload/image`,
          {
            method: "POST",
            body: formDataImage,
            headers: {
              Authorization: `Bearer ${cookies.get("jwt")}`,
            },
          }
        );

        if (req2.status == 200) {
          toast({
            variant: "default",
            title: "Success",
            description: "Tool image uploaded successfully.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error:",
            description: "Tool image upload failed.",
          });
        }
      }

      // laser file upload
      if (laserFileBlob) {
        const formDataLaserFile = new FormData();
        formDataLaserFile.append("file", laserFileBlob);
        formDataLaserFile.append("toolId", res.id);
        // tool image upload
        const req2 = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/s3/upload/laser`,
          {
            method: "POST",
            body: formDataLaserFile,
            headers: {
              Authorization: `Bearer ${cookies.get("jwt")}`,
            },
          }
        );

        if (req2.status == 200) {
          return toast({
            variant: "default",
            title: "Success",
            description: "Tool laser file uploaded successfully.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error:",
            description: "Tool laser file upload failed.",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col w-full px-10 min-h-screen bg-black">
      <div className="flex flex-row border-[1px] border-primary rounded-xl text-white w-full my-2">
        <div className="flex flex-col flex-row w-full">
          <div className="flex flex-row pt-6 px-5 items-center w-full">
            <h1 className="text-white font-semibold text-2xl flex flex-row items-center gap-3">
              <NotebookPen />
              Create Tool
            </h1>
            <div className="flex flex-row ml-auto right-0 gap-3">
              <Button
                asChild
                variant={"destructive"}
                className="ml-auto right-0 text-white"
              >
                <Link href="/apps/app/inventory?view=home">Cancel</Link>
              </Button>
              <Button
                variant={"outline"}
                className="ml-auto right-0 text-black"
                onClick={() => handleCreateTool()}
              >
                Create
              </Button>
            </div>
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
              <ImageUpload setImageBlob={setImageBlob} />
              <LaserFileUpload
                setFileName={setLaserFileName}
                setFileBlob={setLaserFileBlob}
              />
            </div>
          </div>
          <hr className="bg-primary border-0  h-px rounded-xl mb-6" />

          <div className="w-full flex flex-row px-5 gap-5">
            <div className="flex flex-row gap-3 w-full mb-auto top-0 flex-wrap">
              <NameInput name={name} setName={setName} />
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
              <ToolBoardInput
                toolBoard={toolBoard}
                setToolBoard={setToolBoard}
              />
            </div>
            <ToolPreviewCard
              name={name}
              imageUrl={imageBlob ? URL.createObjectURL(imageBlob) : ""}
              lsrFileName={laserFileName}
              description={description}
              chassis={chassis}
              toolBoard={toolBoard}
              cabinet={cabinet}
              bmwGroup={bmwGroup}
              bmwSubGroup={bmwSubGroup}
              location={location}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTool;
