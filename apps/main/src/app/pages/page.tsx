import data from "./sample.json";
import { DataTable } from "@root/components/core/data-table";
import { columns } from "./columns";

export default function Pages() {
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
