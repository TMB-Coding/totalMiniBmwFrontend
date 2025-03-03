"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const UserManagement = () => {
  const router = useRouter();

  return (
    <div className="flex flex-row m-12">
      <div className="flex flex-col">
        <ArrowLeft
          className="text-white mb-6 cursor-pointer"
          size={20}
          onClick={() => router.push("/apps")}
        />
        <h1 className="font-thin text-md text-white">Total MINI & BMW</h1>
        <h1 className="font-semibold text-2xl text-white">User Management</h1>
      </div>
    </div>
  );
};

export default UserManagement;
