"use client";

import { useUser } from "@clerk/nextjs";
import {
  UIBuilder,
  DraggableElement,
  FrameCanvas,
} from "@root/components/core/ui-builder";
import { Button } from "@root/components/ui/button";
import { Input } from "@root/components/ui/input";
import { toast } from "@root/components/ui/use-toast";

import { FRAME_ELEMENTS } from "@root/constants/frame-elements";
import { supabase } from "@root/supabase/server";
import { Frame, Tag } from "@root/types/frame.type";
import { useState } from "react";

const skeleton = {
  header: {
    render: false,
  },
  nav: {
    render: false,
  },
  aside: {
    render: false,
  },
  main: {},
  footer: {
    render: false,
  },
};

export default function AddNewFrame() {
  const { user, isSignedIn } = useUser();
  const [frame, updateFrame] = useState<Frame>(skeleton);
  const [frameName, setFrameName] = useState("");

  const handleSaving = async () => {
    const { error } = await supabase
      .from("frames")
      .insert({
        name: frameName,
        template: frame,
        created_by: user?.id,
        created_by_name: user?.fullName || "",
        updated_by: user?.id,
        updated_by_name: user?.fullName || "",
      })
      .eq("name", "")
      .single();

    toast({
      title: error ? "There was some error" : "Frame saved",
      description: error
        ? error.message
        : "Added new frame to library: " + frameName,
    });
  };

  return (
    <main className="container mx-auto h-[calc(100vh-64px)]">
      <div className="flex items-center justify-between gap-4 pb-4">
        <Input
          type="text"
          value={frameName}
          placeholder="Enter frame name here"
          onChange={(event) => setFrameName(event.currentTarget.value)}
        />
        <Button
          variant="default"
          onClick={handleSaving}
          disabled={!isSignedIn || frameName.length === 0}
        >
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
