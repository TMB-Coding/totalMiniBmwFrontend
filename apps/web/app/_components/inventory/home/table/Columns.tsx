"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@repo/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { Tool } from "../../../../../types/ToolModel";
import { useCookies } from "next-client-cookies";
import { useToast } from "@repo/ui/hooks/use-toast";
import { useRouter } from "next/navigation";

const DeleteTool = ({ id }: { id: string }) => {
  const cookies = useCookies();
  const { toast } = useToast();
  const handleDeletePress = async () => {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/tool/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${cookies.get("jwt")}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (req.status == 500) {
      return toast({
        variant: "destructive",
        title: "Access Denied",
        description:
          "Your granted authorities are insufficient to access this resource.",
      });
    }
    window.location.reload();
  };

  return (
    <DropdownMenuItem onClick={() => handleDeletePress()}>
      Delete Tool
    </DropdownMenuItem>
  );
};

export const columns: ColumnDef<Tool>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "barcode",
    header: "Barcode",
  },
  {
    accessorKey: "bmwGroup",
    header: "Group",
  },
  {
    accessorKey: "bmwSubGroup",
    header: "Sub Group",
  },
  {
    accessorKey: "condition",
    header: "Condition",
  },
  {
    accessorKey: "cabinet",
    header: "Cabinet",
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const tool = row.original;
      const router = useRouter();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(tool.id)}
            >
              Copy tool ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DeleteTool id={tool.id} />
            <DropdownMenuItem
              onClick={() =>
                router.push(`/apps/app/inventory?view=edit&id=${tool.id}`)
              }
            >
              Edit Tool
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
