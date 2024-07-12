import { redirect } from "next/navigation";
import { supabase } from "@root/supabase/server";

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
    <main className="container mx-auto h-[calc(100vh-64px)] py-4">
      {frame.name}
    </main>
  );
}
