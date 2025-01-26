import { Button } from "@repo/ui/components/button";
import { Link, PlusIcon, UserIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import UserRow from "./UserRow";
import { UserModel } from "../../../../types/UserModel";
import { useCookies } from "next-client-cookies";
import { useToast } from "@repo/ui/hooks/use-toast";
import { AddUser } from "./AddUser";

const AccessControl = () => {
  const cookies = useCookies();
  const { toast } = useToast();

  const [usersWithInventoryAuthority, setUsersWithInventoryAuthority] =
    useState<UserModel[]>([]);

  const fetchUsers = async () => {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/authority/retrieve/INVENTORY`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + cookies.get("jwt") },
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
    setUsersWithInventoryAuthority(res);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col w-full px-10 mt-2">
      <div className="flex flex-col border-[1px] border-primary h-full rounded-xl text-white w-full">
        <div className="flex flex-row pt-6 px-5 items-center w-full">
          <h1 className="text-white font-semibold text-2xl flex flex-row items-center gap-3">
            <UserIcon />
            Access Control
          </h1>
          <div className="ml-auto right-0">
            <AddUser refetch={fetchUsers} />
          </div>
        </div>
        <hr className="bg-primary border-0  h-px my-6 rounded-xl" />
        {usersWithInventoryAuthority &&
          usersWithInventoryAuthority.map((user, index) => (
            <UserRow user={user} key={index} refetch={fetchUsers} />
          ))}
      </div>
    </div>
  );
};

export default AccessControl;
