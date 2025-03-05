"use client";
import { Button } from "@repo/ui/components/button";
import { ArrowLeft, PencilIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DeleteUserDialog from "../../../_components/user_mgmt/DeleteUserDialog";
import { useCookies } from "next-client-cookies";
import { UserModel } from "../../../../types/UserModel";
import InsufficientAuthorities from "../../../_components/error_views/InsufficientAuthorities";
import Loader from "../../../_components/inventory/reusables/Loader";
import { extractRole } from "../../../../types/AuthorityModel";

const UserManagement = () => {
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<UserModel[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const cookies = useCookies();
  const router = useRouter();

  const handleModifyUserClick = async (userId: string) => {};

  useEffect(() => {
    async function queryUsers() {
      setError(null);
      const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/`, {
        method: "GET",
        headers: { Authorization: "Bearer " + cookies.get("jwt") },
      });

      const res: UserModel[] = await req.json();
      if (req.status == 500) {
        setError(
          "The server indicated your granted authorities are insufficient to access this resource."
        );
      }
      setLoading(false);
      setUsers(res);
      console.log(res);
    }
    queryUsers();
  }, []);

  return (
    <div className="flex flex-col p-12 h-screen">
      <div className="absolute top-20 left-40 w-24 h-24 rounded-full bg-white blur-md opacity-30"></div>
      <div className="absolute bottom-32 right-40 w-32 h-32 rounded-full bg-white blur-md opacity-25"></div>
      <div className="absolute top-40 right-60 w-20 h-20 rounded-full bg-white blur-md opacity-20"></div>
      <div className="absolute bottom-60 left-20 w-28 h-28 rounded-full bg-white blur-md opacity-15"></div>
      <div className="absolute top-1/4 right-1/4 w-16 h-16 rounded-full bg-white blur-md opacity-20"></div>
      <div className="absolute bottom-1/4 left-1/4 w-20 h-20 rounded-full bg-white blur-md opacity-25"></div>
      <div className="absolute top-3/4 right-1/3 w-24 h-24 rounded-full bg-white blur-md opacity-20"></div>
      <div className="absolute top-1/3 left-2/3 w-16 h-16 rounded-full bg-white blur-md opacity-15"></div>
      <div className="absolute bottom-1/2 right-1/2 w-20 h-20 rounded-full bg-white blur-md opacity-20"></div>
      <div className="absolute top-1/2 left-1/2 w-28 h-28 rounded-full bg-white blur-md opacity-25"></div>
      <div className="absolute top-10 right-20 w-12 h-12 rounded-full bg-white blur-md opacity-20"></div>
      <div className="absolute bottom-20 left-40 w-14 h-14 rounded-full bg-white blur-md opacity-30"></div>
      <div className="flex flex-col">
        <ArrowLeft
          className="text-white mb-6 cursor-pointer"
          size={20}
          onClick={() => router.push("/apps")}
        />
        <h1 className="font-thin text-md text-white">Total MINI & BMW</h1>
        <h1 className="font-semibold text-2xl text-white">User Management</h1>
      </div>
      {loading && (
        <div className="flex h-full items-center justify-center">
          <Loader color="white" />
        </div>
      )}
      {error && (
        <div className="flex h-full items-center justify-center">
          <InsufficientAuthorities error={error} />
        </div>
      )}

      {!error && !loading && (
        <div className="grid grid-cols-4 gap-4">
          {users?.map((user, index) => (
            <div className="mt-6" key={index}>
              <div
                className="relative w-80 rounded-xl backdrop-filter backdrop-blur-md bg-white bg-opacity-5 border border-white border-opacity-10 shadow-xl"
                style={{
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                {/* Inner container for content */}
                <div className="p-8 h-full flex flex-col">
                  <div className="flex flex-col space-y-1">
                    <div className="flex flex-row gap-1 items-center">
                      <h3 className="text-xl font-medium text-white">
                        {user.firstName} {user.lastName}
                      </h3>
                      <DeleteUserDialog />
                    </div>
                    <div className="flex flex-row gap-2">
                      <h3 className="text-white font-regular text-md bg-red-500 w-min rounded-lg px-2">
                        {extractRole(user.authorities).toString()}
                      </h3>
                      <h3 className="text-white font-regular text-md border-red-500 border-[1px] w-min rounded-lg px-2">
                        {user.employeeNumber}
                      </h3>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleModifyUserClick(user.id)}
                    className="text-black bg-white hover:bg-white mt-6"
                  >
                    Modify User
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserManagement;
