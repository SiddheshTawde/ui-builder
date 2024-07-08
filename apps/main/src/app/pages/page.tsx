import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@root/components/ui/button";

import data from "./sample.json";
import { DataTable } from "@root/components/core/data-table";
import { columns } from "./columns";

export default function Pages() {
  return (
    <main className="container mx-auto">
      <div className="mb-4 flex w-full items-center justify-between">
        <p className="text-lg font-medium">Available Pages</p>

        <Button variant="default" className="flex items-center gap-2" asChild>
          <Link href="/pages/add">
            <PlusIcon className="h-4 w-4" />
            <span>Add New Page</span>
          </Link>
        </Button>
      </div>

      <DataTable columns={columns} data={data} />
    </main>
  );
}
