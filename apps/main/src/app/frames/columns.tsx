"use client";

import Link from "next/link";
import moment from "moment";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@root/components/ui/button";
import { Tables } from "@root/supabase/supabase.types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Tables<"frames">>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <Button variant="link" asChild>
          <Link href={"/frames/" + row.getValue("name")}>
            {row.getValue("name")}
          </Link>
        </Button>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "updated_by_name",
    header: "Updated By",
  },
  {
    accessorKey: "updated_on",
    header: "Updated On",
    cell: ({ row }) =>
      moment(row.getValue("updated_on")).format("MMM DD, YYYY"),
  },
  {
    accessorKey: "created_by_name",
    header: "Created By",
  },
  {
    accessorKey: "created_on",
    header: "Created On",
    cell: ({ row }) =>
      moment(row.getValue("created_on")).format("MMM DD, YYYY"),
  },
];
