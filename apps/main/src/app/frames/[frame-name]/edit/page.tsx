import React from "react";

import { Frame } from "@root/types/frame.type";
import { supabase } from "@root/supabase/server";

import RenderEditFrame from "./render";

type EditFrameProps = {
  params: { "frame-name": string };
};

export default async function EditFrame({ params }: EditFrameProps) {
  const { data, error } = await supabase
    .from("frames")
    .select("*")
    .eq("name", params["frame-name"])
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return <RenderEditFrame name={data.name} template={data.template as Frame} />;
}
