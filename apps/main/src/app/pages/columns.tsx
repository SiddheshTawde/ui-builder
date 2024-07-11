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
    header: ({ header }) => (
      <span className="capitalize">{header.id.replaceAll("_", " ")}</span>
    ),
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
    accessorKey: "updated_by",
    header: ({ header }) => (
      <span className="capitalize">{header.id.replaceAll("_", " ")}</span>
    ),
  },
  {
    accessorKey: "updated_at",
    header: ({ header }) => (
      <span className="capitalize">{header.id.replaceAll("_", " ")}</span>
    ),
    cell: ({ row }) =>
      moment(row.getValue("updated_at")).format("MMM DD, YYYY"),
  },
  {
    accessorKey: "created_by",
    header: ({ header }) => (
      <span className="capitalize">{header.id.replaceAll("_", " ")}</span>
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ header }) => (
      <span className="capitalize">{header.id.replaceAll("_", " ")}</span>
    ),
    cell: ({ row }) =>
      moment(row.getValue("created_at")).format("MMM DD, YYYY"),
  },
];
