import { Button } from "@repo/ui/components/button";

import { NotebookPen } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
import ImageUpload from "../create/create_tool/ImageUpload";
import LaserFileUpload from "../create/create_tool/LaserFileUpload";
import { useCookies } from "next-client-cookies";
import { useToast } from "@repo/ui/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";

interface ApiErrorResponse {
  status: string;
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
}

const EditTool = () => {
  const cookies = useCookies();
  const { toast } = useToast();
  const router = useRouter();
  const toolId = useSearchParams().get("id");

  //placeholders
  const [placeholderName, setPlaceholderName] = useState<string>("");
  const [placeholderCondition, setPlaceholderCondition] = useState<string>("");
  const [placeholderCabinet, setPlaceholderCabinet] = useState<string>("");
  const [placeholderBmwGroup, setPlaceholderBmwGroup] = useState<
    number | undefined
  >(undefined);
  const [placeholderBmwSubGroup, setPlaceholderBmwSubGroup] = useState<
    number | undefined
  >(undefined);
  const [placeholderChassis, setPlaceholderChassis] = useState<string>("");
  const [placeholderDescription, setPlaceholderDescription] =
    useState<string>("");
  const [placeholderLocation, setPlaceholderLocation] = useState<string>("");
  const [placeholderToolBoard, setPlaceholderToolBoard] = useState<string>("");

  const [newName, setNewName] = useState<string>("");
  const [newCondition, setNewCondition] = useState<string>("");
  const [newCabinet, setNewCabinet] = useState<string>("");
  const [newBmwGroup, setNewBmwGroup] = useState<number | undefined>(undefined);
  const [newBmwSubGroup, setNewBmwSubGroup] = useState<number | undefined>(
    undefined
  );
  const [newChassis, setNewChassis] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [newLocation, setNewLocation] = useState<string>("");
  const [newToolBoard, setNewToolBoard] = useState<string>("");

  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [fileBlob, setFileBlob] = useState<Blob | null>(null);
  const [fileName, setFileName] = useState<string>("");

  useEffect(() => {
    const queryToolData = async () => {
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/tool/${toolId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.get("jwt")}`,
          },
        }
      );
      const data = await req.json();
      setPlaceholderName(data.name);
      setPlaceholderCondition(data.condition.toLowerCase());
      setPlaceholderCabinet(data.cabinet);
      setPlaceholderBmwGroup(data.bmwGroup);
      setPlaceholderBmwSubGroup(data.bmwSubGroup);
      setPlaceholderChassis(data.chassis);
      setPlaceholderDescription(data.description);
      setPlaceholderLocation(data.location);
      setPlaceholderToolBoard(data.toolBoard);
    };
    queryToolData();
  }, [toolId]);

  const handleToolEdit = async () => {
    try {
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/tool/${toolId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.get("jwt")}`,
          },
          body: JSON.stringify({
            name: !newName ? placeholderName : newName,
            condition: !newCondition
              ? placeholderCondition.toUpperCase()
              : newCondition.toUpperCase(),
            cabinet: placeholderCabinet,
            bmwGroup: !newBmwGroup ? placeholderBmwGroup : newBmwGroup,
            bmwSubGroup: !newBmwSubGroup
              ? placeholderBmwSubGroup
              : newBmwSubGroup,
            chassis: !newChassis ? placeholderChassis : newChassis,
            description: !newDescription
              ? placeholderDescription
              : newDescription,
            location: !newLocation ? placeholderLocation : newLocation,
            toolBoard: !newToolBoard ? placeholderToolBoard : newToolBoard,
          }),
        }
      );
      const res: ApiErrorResponse = await req.json();
      if (req.status == 400) {
        return toast({
          variant: "destructive",
          title: "Error:",
          description: (
            <>
              {res.errors.map((error) => (
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
          "Tool edited successfully. If any file edits we're made, they are pending upload and you will be notified.",
      });
      if (imageBlob) {
        const formData = new FormData();
        formData.append("image", imageBlob);
        formData.append("toolId", toolId!);

        const req2 = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/s3/upload/image`,
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${cookies.get("jwt")}`,
            },
          }
        );
        await req2.json();
        if (req2.status == 200) {
          toast({
            variant: "default",
            title: "Success",
            description: "Tool image uploaded successfully.",
          });
        } else {
          toast({
            variant: "default",
            title: "destructive",
            description: "Tool image upload failed.",
          });
        }
      }
      if (fileBlob) {
        const formDataLaserFile = new FormData();
        formDataLaserFile.append("file", fileBlob);
        formDataLaserFile.append("toolId", toolId!);
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
              Edit Tool
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
                onClick={() => handleToolEdit()}
              >
                Complete Edit
              </Button>
            </div>
          </div>
          <hr className="bg-primary border-0  h-px my-6 rounded-xl" />
          <div className="flex flex-row px-5 mb-6 w-full items-center gap-3 justify-between">
            <div className="flex flex-row gap-3">
              <ConditionDropdown
                condition={placeholderCondition}
                setCondition={setPlaceholderCondition}
              />
              <CabinetDropdown
                cabinet={placeholderCabinet}
                setCabinet={setPlaceholderCabinet}
              />
            </div>
            <div className="inline-block h-full mx-12 w-0.5 bg-primary"></div>
            <div className="flex flex-row gap-3">
              <ImageUpload setImageBlob={setImageBlob} />
              <LaserFileUpload
                setFileBlob={setFileBlob}
                setFileName={setFileName}
              />
            </div>
          </div>
          <hr className="bg-primary border-0  h-px rounded-xl mb-6" />

          <div className="w-full flex flex-row px-5 gap-5">
            <div className="flex flex-row gap-3 w-full mb-auto top-0 flex-wrap">
              <NameInput
                name={newName}
                setName={setNewName}
                ph={placeholderName}
              />
              <ChassisInput
                chassis={newChassis}
                setChassis={setNewChassis}
                ph={placeholderChassis}
              />
              <BMWGroup
                bmwGroup={newBmwGroup}
                setBMWGroup={setNewBmwGroup}
                ph={placeholderBmwGroup}
              />
              <BMWSubGroup
                ph={placeholderBmwSubGroup}
                bmwSubGroup={newBmwSubGroup}
                setBMWSubGroup={setNewBmwSubGroup}
              />
              <DescriptionInput
                ph={placeholderDescription}
                description={newDescription}
                setDescription={setNewDescription}
              />
              <LocationInput
                location={newLocation}
                setLocation={setNewLocation}
                ph={placeholderLocation}
              />
              <ToolBoardInput
                ph={placeholderToolBoard}
                toolBoard={newToolBoard}
                setToolBoard={setNewToolBoard}
              />
            </div>
            <ToolPreviewCard
              name={!newName ? placeholderName : newName}
              imageUrl={
                !imageBlob
                  ? `${process.env.NEXT_PUBLIC_S3_URL}/${toolId}`
                  : URL.createObjectURL(imageBlob)
              }
              lsrFileName={fileName}
              description={
                !newDescription ? placeholderDescription : newDescription
              }
              chassis={!newChassis ? placeholderChassis : newChassis}
              toolBoard={!newToolBoard ? placeholderToolBoard : newToolBoard}
              cabinet={!newCabinet ? placeholderCabinet : newCabinet}
              bmwGroup={!newBmwGroup ? placeholderBmwGroup : newBmwGroup}
              bmwSubGroup={
                !newBmwSubGroup ? placeholderBmwSubGroup : newBmwSubGroup
              }
              location={!newLocation ? placeholderLocation : newLocation}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTool;
