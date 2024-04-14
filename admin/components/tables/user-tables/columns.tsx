"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { User } from "@/constants/data";
import { Checkbox } from "@/components/ui/checkbox";
import { ReactNode } from "react";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "fullName",
    header: "FULLNAME",
  },
  {
    accessorKey: "userName",
    header: "USERNAME",
  },
  {
    accessorKey: "email",
    header: "EMAIL",
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ getValue }) => {
      const status = getValue();
      return (
        <span className={status === "Active" ? "text-green-500" : "text-red-500"}>
          {status as ReactNode}
        </span>
      );
    },
  },
  {
    header: "ACTIONS",
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
