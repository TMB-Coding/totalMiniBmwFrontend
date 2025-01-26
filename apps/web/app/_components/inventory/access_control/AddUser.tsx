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
import { useToast } from "@repo/ui/hooks/use-toast";
import { PlusCircleIcon } from "lucide-react";
import { useCookies } from "next-client-cookies";
import { useState } from "react";

interface AddUserProps {
  refetch: () => void;
}

export function AddUser({ refetch }: AddUserProps) {
  const cookies = useCookies();
  const { toast } = useToast();

  const [email, setEmail] = useState<string>("");

  const grantAuthority = async () => {
    if (!email) {
      return toast({
        variant: "destructive",
        title: "Error:",
        description: "Email is required.",
      });
    }

    const req = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/authority/`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + cookies.get("jwt"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, authority: "INVENTORY" }),
      }
    );

    const res = await req.json();
    if (req.status == 400) {
      return toast({
        variant: "destructive",
        title: "Error:",
        description: (
          <>
            {res.errors.map(
              (error: {
                field: React.Key | null | undefined;
                message:
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | Promise<React.AwaitedReactNode>
                  | null
                  | undefined;
              }) => (
                <p key={error.field}>{error.message}</p>
              )
            )}
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
    refetch();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-black">
          <PlusCircleIcon color="black" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
          <DialogDescription>
            Adding an user will grant them the "INVENTORY" authority allowing
            them access to certain protected endpoints on the server. Make sure
            this is what you want.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Email
            </Label>
            <Input
              id="name"
              placeholder="chad@company.com"
              value={email}
              className="col-span-3"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => grantAuthority()}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
