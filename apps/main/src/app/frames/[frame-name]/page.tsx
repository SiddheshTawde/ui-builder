import { redirect } from "next/navigation";
import { supabase } from "@root/supabase/server";
import { Frame } from "@root/types/frame.type";
import RenderFrame from "@root/lib/render-frame";
import moment from "moment";

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
    <main className="container mx-auto flex h-[calc(100vh-64px)] items-stretch gap-x-4 overflow-y-auto py-4">
      <div className="flex h-full w-full max-w-screen-md flex-col gap-y-2 rounded border p-2">
        {(frame.template as Frame[]).length == 0
          ? null
          : (frame.template as Frame[]).map((node) => (
              <RenderFrame key={node.id} {...node} />
            ))}
      </div>
      <div className="flex-1">
        <p className="text-2xl font-semibold capitalize">
          {frame.name.replaceAll("-", " ")}
        </p>
        <p className="text-sm">
          <span className="text-transparent/60">Page Route:</span>{" "}
          <span className="font-medium">{frame.name}</span>
        </p>

        <div className="mt-5 flex flex-col gap-y-2">
          <div className="flex items-center gap-x-2 text-sm">
            <div className="w-20 text-transparent/60">Updated By</div>
            <div>{frame.updated_by}</div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-20 text-transparent/60">Updated At</div>
            <div>{moment(frame.updated_at).format("MMM DD, YYYY")}</div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-20 text-transparent/60">Created By</div>
            <div>{frame.created_by}</div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-20 text-transparent/60">Created At</div>
            <div>{moment(frame.created_at).format("MMM DD, YYYY")}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
