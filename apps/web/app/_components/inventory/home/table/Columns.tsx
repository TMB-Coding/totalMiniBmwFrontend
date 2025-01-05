"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Tool = {
  id: string;
  barcode: number;
  group: string;
  subGroup: string;
  condition: string;
  name: string;
  cabinet: string;
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
    accessorKey: "group",
    header: "Group",
  },
  {
    accessorKey: "subGroup",
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
];
