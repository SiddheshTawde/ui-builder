import { supabase } from "@root/supabase/server";
import { redirect } from "next/navigation";
import { Frame } from "@root/types/frame.type";
import { Button } from "@root/components/ui/button";
import Link from "next/link";

type FramePageProps = {
  params: {
    "frame-name": string;
  };
};

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
    <main className="mx-auto flex h-[calc(100vh-64px)] max-w-screen-lg flex-col items-start">
      <div className="flex items-center justify-start gap-4 pb-4">
        <p className="text-3xl">{frame.name}</p>

        <Button variant="outline">
          <Link href={"/frames/" + params["frame-name"] + "/edit"}>
            Edit Frame
          </Link>
        </Button>
      </div>
      <div className="flex w-full flex-1 flex-col gap-4 border p-4">
        {(frame.template as Frame).header.render ? (
          <div className="flex h-16 items-center justify-center border bg-transparent/5">
            header
          </div>
        ) : null}
        {(frame.template as Frame).nav.render ? (
          <div className="flex h-12 items-center justify-center border bg-transparent/5">
            navbar
          </div>
        ) : null}

        <main className="flex flex-1 flex-row items-stretch gap-x-4">
          {(frame.template as Frame).aside.render ? (
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

        {(frame.template as Frame).footer.render ? (
          <div className="flex h-16 items-center justify-center border bg-transparent/5">
            footer
          </div>
        ) : null}
      </div>
    </main>
  );
}
