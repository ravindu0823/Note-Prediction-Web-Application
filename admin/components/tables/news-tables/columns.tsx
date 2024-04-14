"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Checkbox } from "@/components/ui/checkbox";
import { News } from "@/constants/data";
import Image from "next/image";

export const columns: ColumnDef<News>[] = [
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
    accessorKey: "title",
    header: "TITLE",
  },
  {
    accessorKey: "image",
    header: "IMAGE",
    cell: ({ getValue }) => {
      const imageUrl = getValue();

      const isValidUrl =
        typeof imageUrl === "string" &&
        imageUrl.length > 0 &&
        (imageUrl.startsWith("/") ||
          imageUrl.startsWith("http://") ||
          imageUrl.startsWith("https://"));

      return isValidUrl ? (
        <Image
          src={imageUrl as string}
          alt="News"
          width={100}
          height={100}
          className="rounded-lg"
          layout="responsive"
        />
      ) : (
        <div></div> // Empty div for null images
      );
    },
  },
  {
    accessorKey: "category",
    header: "CATEGORY",
  },
  {
    accessorKey: "target",
    header: "URL",
    cell: ({ getValue }) => (
      <a
        href={getValue() as string}
        className="text-blue-500 underline"
        target="_blank"
        rel="noreferrer"
      >
        {getValue() as string}
      </a>
    ),
  },
  {
    accessorKey: "desc",
    header: "DESCRIPTION",
  },
  {
    accessorKey: "date",
    header: "UPLOADED DATE",
  },
  {
    header: "ACTIONS",
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
