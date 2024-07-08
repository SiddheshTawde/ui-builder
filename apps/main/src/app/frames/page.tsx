import Link from "next/link";

import { PlusIcon } from "@heroicons/react/24/outline";

import { supabase } from "@root/supabase/server";
import { Button } from "@root/components/ui/button";
import { DataTable } from "@root/components/core/data-table";

import { columns } from "./columns";

export default async function FramesPage() {
  const { data, error } = await supabase.from("frames").select("*").limit(10);

  return (
    <main className="container mx-auto">
      <div className="mb-4 flex w-full items-center justify-between">
        <p className="text-lg font-medium">Available Frames</p>

        <Button variant="default" className="flex items-center gap-2" asChild>
          <Link href="/frames/add">
            <PlusIcon className="h-4 w-4" />
            <span>Add New Frame</span>
          </Link>
        </Button>
      </div>

      {data !== null ? <DataTable columns={columns} data={data} /> : null}
    </main>
  );
}
