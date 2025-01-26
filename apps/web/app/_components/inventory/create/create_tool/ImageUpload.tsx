import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import React, { useRef } from "react";

interface ImageUploadProps {
  setImageBlob: (blob: Blob) => void;
}

const ImageUpload = ({ setImageBlob }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      setImageBlob(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Trigger the file input to open
  };
  return (
    <div>
      <Input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <Button
        variant={"outline"}
        className="text-black"
        onClick={handleButtonClick}
      >
        +&nbsp; Image
      </Button>
    </div>
  );
};

export default ImageUpload;
