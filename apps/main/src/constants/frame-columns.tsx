"use client";

import Link from "next/link";
import moment from "moment";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@root/components/ui/button";
import { Tables } from "@root/supabase/supabase.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@root/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Tables<"frames">>[] = [
  {
    accessorKey: "name",
    header: ({ header }) => (
      <span className="px-4 capitalize">{header.id.replaceAll("_", " ")}</span>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-4">
          <Button variant="link" asChild>
            <Link href={"/frames/" + row.getValue("name")}>
              {row.getValue("name")}
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link href={"/frames/" + row.getValue("name") + "/edit"}>
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Clone</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
