"use client";

import moment from "moment";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@root/components/ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Page = {
  id: string;
  display_name: string;
  created_by: string;
  created_by_id: string;
  created_on: string;
  updated_by: string;
  updated_by_id: string;
  updated_on: string;
};

export const columns: ColumnDef<Page>[] = [
  {
    accessorKey: "display_name",
    header: "Page Name",
    enableSorting: true,
    enablePinning: true,
  },
  {
    accessorKey: "updated_by",
    header: "Updated By",
  },
  {
    accessorKey: "updated_on",
    header: "Updated On",
    cell: ({ row }) =>
      moment(row.getValue("updated_on")).format("MMM DD, YYYY"),
  },
  {
    accessorKey: "created_by",
    header: "Created By",
  },
  {
    accessorKey: "created_on",
    header: "Created On",
    cell: ({ row }) =>
      moment(row.getValue("created_on")).format("MMM DD, YYYY"),
  },
  {
    accessorKey: "actions",
    header: () => (
      <div
        style={{
          textAlign: "center",
        }}
      >
        Header
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-x-12">
        <Button variant="link">Edit</Button>
        <Button variant="destructive">Delete</Button>
      </div>
    ),
  },
];
