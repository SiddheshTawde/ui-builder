import { supabase } from "@root/supabase/server";
import { DataTable } from "@root/components/core/data-table";

import { columns } from "./columns";

export default async function Pages() {
  const { data, error } = await supabase.from("pages").select("*").limit(10);

  if (error) {
    return <div>There was some error</div>;
  }

  return (
    <main className="container mx-auto h-[calc(100vh-64px)]">
      <DataTable
        columns={columns}
        data={data}
        add={{ title: "Add New Page", href: "/pages/add" }}
      />
    </main>
  );
}
