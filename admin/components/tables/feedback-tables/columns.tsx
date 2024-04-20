"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ReactNode } from "react";
import { Feedback } from "@/constants/data";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<Feedback>[] = [
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
    accessorKey: "firstName",
    header: "FIRST NAME",
  },
  {
    accessorKey: "lastName",
    header: "LAST NAME",
  },
  {
    accessorKey: "email",
    header: "EMAIL",
  },
  {
    accessorKey: "phoneNumber",
    header: "PHONE NUMBER",
  },
  {
    accessorKey: "feedback",
    header: "FEEDBACK",
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
