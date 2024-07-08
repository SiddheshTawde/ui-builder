import Link from "next/link";

import { PlusIcon } from "@heroicons/react/24/outline";

import { supabase } from "@root/supabase/server";
import { Button } from "@root/components/ui/button";
import { DataTable } from "@root/components/core/data-table";

import { columns } from "./columns";

export default async function FramesPage() {
  const { data, error } = await supabase.from("frames").select("*").limit(10);

  if (error) {
    return <div>There was some error</div>;
  }

  return (
    <main className="container mx-auto h-[calc(100vh-64px)]">
      <DataTable
        columns={columns}
        data={data}
        add={{ title: "Add New Frame", href: "/frames/add" }}
      />
    </main>
  );
}
