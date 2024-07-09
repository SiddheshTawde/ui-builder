import Link from "next/link";
import moment from "moment";
import { redirect } from "next/navigation";
import { Frame } from "@root/types/frame.type";
import { Button } from "@root/components/ui/button";
import { supabase } from "@root/supabase/server";

type FramePageProps = {
  params: {
    "frame-name": string;
  };
};

const IGNORE_KEYS = ["id", "template", "created_by_id", "updated_by_id"];

export default async function FramePage({ params }: FramePageProps) {
  const { data: frame, error } = await supabase
    .from("frames")
    .select("*")
    .eq("name", params["frame-name"])
    .single();

  if (error) {
    redirect("/not-found");
  }

  return (
    <main className="container mx-auto flex h-[calc(100vh-64px)] items-stretch gap-x-4 py-4">
      <div className="flex w-full flex-1 flex-col gap-4 border p-4">
        {(frame.template as Frame).header?.render ? (
          <div className="flex h-16 items-center justify-center border bg-transparent/5">
            header
          </div>
        ) : null}
        {(frame.template as Frame).nav?.render ? (
          <div className="flex h-12 items-center justify-center border bg-transparent/5">
            navbar
          </div>
        ) : null}

        <main className="flex flex-1 flex-row items-stretch gap-x-4">
          {(frame.template as Frame).aside?.render ? (
            <div className="flex w-80 items-center justify-center border bg-transparent/5">
              aside
            </div>
          ) : null}

          <div className="flex flex-1 flex-col gap-y-4">
            {Object.keys((frame.template as Frame).main).map((section) =>
              (frame.template as Frame).main[section].render ? (
                <div
                  key={section}
                  className="flex w-full flex-1 items-center justify-center border bg-transparent/5"
                >
                  {section}
                </div>
              ) : null,
            )}
          </div>
        </main>

        {(frame.template as Frame).footer?.render ? (
          <div className="flex h-16 items-center justify-center border bg-transparent/5">
            footer
          </div>
        ) : null}
      </div>
      <div className="flex flex-col pb-4">
        <div className="mb-4 flex w-full items-center justify-between">
          <p className="text-xl font-semibold">Frame Details:</p>

          <Button variant="outline" asChild>
            <Link href={"/frames/" + params["frame-name"] + "/edit"}>
              Edit Frame
            </Link>
          </Button>
        </div>
        <div>
          {Object.entries(frame)
            .filter(([field]) => !IGNORE_KEYS.includes(field))
            .map(([field, value]) => (
              <div key={field} className="grid w-full grid-cols-3 gap-x-2 py-2">
                <div className="col-span-1">
                  <span className="w-full font-semibold capitalize">
                    {field.replaceAll("_", " ")}:
                  </span>
                </div>
                <div className="col-span-2">
                  {field === "created_at" || field === "updated_at"
                    ? moment(value as string).format("MMM DD, YYYY")
                    : (value as string)}
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
