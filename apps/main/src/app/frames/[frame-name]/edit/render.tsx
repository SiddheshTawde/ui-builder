"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";

import {
  DraggableElement,
  FrameCanvas,
  UIBuilder,
} from "@root/components/core/ui-builder";
import { FRAME_ELEMENTS } from "@root/constants/frame-elements";
import { Frame, Tag } from "@root/types/frame.type";
import { Button } from "@root/components/ui/button";
import { supabase } from "@root/supabase/server";
import { useToast } from "@root/components/ui/use-toast";

type RenderEditFrameProps = {
  name: string;
  template: Frame;
};

export default function RenderEditFrame({
  name,
  template,
}: RenderEditFrameProps) {
  const { toast } = useToast();
  const { user, isSignedIn } = useUser();

  const [frame, updateFrame] = React.useState<Frame>(template);

  const handleSaving = async () => {
    const { error } = await supabase
      .from("frames")
      .update({
        template: frame,
        updated_by: user?.id,
        updated_by_name: user?.fullName || "",
      })
      .eq("name", name)
      .single();

    toast({
      title: error ? "There was some error" : "Frame saved",
      description: error ? error.message : "",
    });
  };

  return (
    <main className="container mx-auto h-[calc(100vh-64px)]">
      <div className="flex items-center justify-between gap-4 pb-4">
        <p className="text-3xl">
          Editing: <span className="font-semibold">{name}</span>
        </p>

        <Button variant="default" onClick={handleSaving} disabled={!isSignedIn}>
          Save Changes
        </Button>
      </div>
      <UIBuilder>
        <div className="flex h-full items-stretch">
          <div className="flex w-80 flex-col gap-y-4 overflow-y-auto p-4">
            {FRAME_ELEMENTS.map((element) => (
              <DraggableElement key={element.tag} type={element.tag as Tag}>
                {element.display}
              </DraggableElement>
            ))}
          </div>

          <div className="flex h-full w-full flex-col gap-4 overflow-y-auto border p-4">
            <FrameCanvas frame={frame} updateFrame={updateFrame} />
          </div>
        </div>
      </UIBuilder>
    </main>
  );
}
