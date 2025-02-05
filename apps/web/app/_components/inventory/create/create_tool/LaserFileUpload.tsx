import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import React, { useRef } from "react";

interface LaserFileUploadProps {
  setFileBlob: (blob: Blob) => void; // Change the prop name if needed
  setFileName: (value: string) => void;
}

const LaserFileUpload = ({
  setFileBlob,
  setFileName,
}: LaserFileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if the file extension is .lbrn or .dxf
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileName(file.name);
      };
      reader.readAsDataURL(file);
      setFileBlob(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Trigger the file input to open
  };

  return (
    <div>
      <Input
        type="file"
        accept=".svg,.dxf" // Accept only .lbrn and .dxf files
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <Button
        variant={"ghost"}
        className="text-black border-white border-[1.8px] rounded-md text-white hover:bg-white hover:text-black"
        onClick={handleButtonClick}
      >
        +&nbsp; Laser File
      </Button>
    </div>
  );
};

export default LaserFileUpload;
