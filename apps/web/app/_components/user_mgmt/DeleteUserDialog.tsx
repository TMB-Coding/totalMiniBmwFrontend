import React, { useState } from "react";
import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { XIcon } from "lucide-react";
import { useCookies } from "next-client-cookies";
import { useToast } from "@repo/ui/hooks/use-toast";

const DeleteUserDialog = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const cookies = useCookies();
  const deleteUser = async () => {
    setOpen(false);

    const req = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/delete`,
      {
        method: "POST",
        body: JSON.stringify({ email: "tester@tester.com" }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("jwt")}`,
        },
      }
    );
    const res = await req.json();
    if (req.status !== 200) {
      return toast({
        variant: "destructive",
        title: "Error:",
        description: <>{res.message}</>,
      });
    }
    toast({
      variant: "default",
      title: "Success:",
      description: <>{res.message}</>,
    });
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <div className="flex rounded-lg border-2 ml-auto right-0 p-1 items-center cursor-pointer">
          <XIcon size={20} color="white" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            By clicking confirm below, you will delete this user from the
            system.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="submit"
            variant={"destructive"}
            onClick={() => deleteUser()}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserDialog;
