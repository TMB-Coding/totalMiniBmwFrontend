import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCookies } from "next-client-cookies";

import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";
import Loader from "../../reusables/Loader";

import { Tool } from "../../../../../types/ToolModel";
import {
  checkToolIdFileExists,
  checkToolIdLaserFileExists,
} from "../../../../../util/apiUtils";

interface AvailableAssets {
  laserFile: boolean;
  imageFile: boolean;
}

export function ViewAssets() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toolData, setToolData] = useState<Tool | null>(null);
  const [availableAssets, setAvailableAssets] =
    useState<AvailableAssets | null>(null);

  const router = useRouter();
  const cookies = useCookies();
  const searchParams = useSearchParams();

  const toolId = searchParams.get("toolId");
  const assets = searchParams.get("assets");
  const view = searchParams.get("view");

  const fetchToolData = async () => {
    if (!toolId) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/tool/${toolId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.get("jwt")}`,
          },
        }
      );

      const data = await res.json();
      setToolData(data);
      setLoading(false);
      return data;
    } catch (error) {
      console.error("Error fetching tool data:", error);
      setLoading(false);
    }
  };

  const checkAvailableAssets = async (id: string) => {
    const laserFileExists = await checkToolIdLaserFileExists(id);
    const imageFileExists = await checkToolIdFileExists(id);
    setAvailableAssets({
      laserFile: laserFileExists,
      imageFile: imageFileExists,
    });
  };

  const downloadLaserFile = async () => {
    if (!toolId || !toolData) return;

    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/assets/download?objectKey=${toolId}_LASER`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${cookies.get("jwt")}` },
      });

      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = objectUrl;
      link.download = `${toolData.id}_LASER.svg`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading laser file:", error);
    }
  };

  const downloadImageFile = async () => {
    if (!toolId || !toolData) return;

    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/assets/download?objectKey=${toolId}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${cookies.get("jwt")}` },
      });

      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = objectUrl;
      link.download = `${toolData.id}_LASER.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading image file:", error);
    }
  };
  useEffect(() => {
    const initializeDialog = async () => {
      if (assets && toolId && view === "home") {
        setLoading(true);
        setToolData(null);
        setAvailableAssets(null);

        const tool = await fetchToolData();
        if (tool) await checkAvailableAssets(tool.id);

        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    initializeDialog();
  }, [assets, toolId, view]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) router.push("/apps/app/inventory?view=home");
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{toolData?.name} Assets</DialogTitle>
          <DialogDescription>
            Viewing current uploaded assets. If the download button is grayed
            out, the asset is not available or has not been uploaded.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <Loader color="black" />
        ) : (
          <div className="mt-2 flex flex-col gap-2">
            <Button
              disabled={!availableAssets?.laserFile}
              onClick={downloadLaserFile}
            >
              Download Laser File
            </Button>
            <Button
              disabled={!availableAssets?.imageFile}
              onClick={downloadImageFile}
            >
              Download Tool Image
            </Button>
          </div>
        )}

        <DialogFooter>
          <Button onClick={() => router.push("/apps/app/inventory?view=home")}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
