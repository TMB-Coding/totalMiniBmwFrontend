import { Button } from "@repo/ui/components/button";
import { MinusCircleIcon } from "lucide-react";
import React from "react";
import { UserModel } from "../../../../types/UserModel";
import { useCookies } from "next-client-cookies";
import { useToast } from "@repo/ui/hooks/use-toast";

interface UserRowProps {
  user: UserModel;
  refetch: () => void;
}

const UserRow = ({ user, refetch }: UserRowProps) => {
  const cookies = useCookies();
  const { toast } = useToast();

  const revokeAuthorityCall = async () => {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/authority/revoke/${user.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + cookies.get("jwt"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ authority: "INVENTORY" }),
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
    console.log("Revoked authority from user: ", user.id);
    refetch();
  };

  return (
    <div className="flex flex-row border-[1px] border-primary rounded-xl m-3">
      <div className="flex flex-row p-4 items-center w-full gap-4">
        <div className="flex flex-col">
          <h1 className="font-semibold text-lg text-white">
            {user.firstName + " " + user.lastName}
          </h1>
        </div>
        <div className="inline-block h-full mx-2 w-0.5 bg-primary"></div>

        <div className="flex flex-col">
          <h1 className="font-semibold text-lg text-white">EN</h1>
          <h1 className="font-regular text-sm text-white">
            {user.employeeNumber}
          </h1>
        </div>
        <div className="flex flex-col">
          <h1 className="font-semibold text-lg text-white">I-ID</h1>
          <h1 className="font-regular text-sm text-white">{user.id}</h1>
        </div>
        <div className="flex flex-col">
          <h1 className="font-semibold text-lg text-white">Authorities </h1>
          <h1 className="font-regular text-sm text-white">
            {user.authorities.map((authority) => authority.authority + ",")}
          </h1>
        </div>
        <Button
          variant={"destructive"}
          className="ml-auto right-0 text-black ml-auto right-0"
          onClick={() => revokeAuthorityCall()}
        >
          <MinusCircleIcon color="white" />
        </Button>
      </div>
    </div>
  );
};

export default UserRow;
