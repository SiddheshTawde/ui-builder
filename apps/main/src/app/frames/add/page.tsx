"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import {
  UIBuilder,
  NewElement,
  FrameCanvas,
} from "@root/components/core/ui-builder";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@root/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@root/components/ui/dialog";

import { Button } from "@root/components/ui/button";
import { Input } from "@root/components/ui/input";
import { toast } from "@root/components/ui/use-toast";

import { supabase } from "@root/supabase/server";

import { Frame, FrameTag } from "@root/types/frame.type";

import { FRAME_ELEMENTS } from "@root/constants/frame-elements";
import { Json } from "@root/supabase/supabase.types";

import "../frame-canvas.css";

export default function AddNewFrame() {
  const ref = useRef(null);
  const router = useRouter();
  const { user, isSignedIn } = useUser();

  const [frameName, setFrameName] = useState("");
  const [frame, updateFrame] = useState<Frame[]>([]);

  const handleSaving = async () => {
    const { error } = await supabase
      .from("frames")
      .insert({
        name: frameName.replaceAll(" ", "-").toLowerCase(),
        template: frame as never as Json,
        created_by_id: user?.id,
        created_by: user?.fullName || "",
        updated_by_id: user?.id,
        updated_by: user?.fullName || "",
      })
      .eq("name", "")
      .single();

    toast({
      title: error ? "There was some error" : "Frame saved",
      description: error
        ? error.message
        : "Added new frame to library: " + frameName,
      variant: error ? "destructive" : "default",
    });
  };

  return (
    <main className="container mx-auto flex h-[calc(100vh-64px)] flex-col">
      <UIBuilder>
        <div className="mt-4 flex flex-1 items-stretch gap-x-4">
          <div className="flex w-96 flex-col gap-y-4 overflow-y-auto">
            <p className="text-lg font-semibold">Frame Elements:</p>
            {FRAME_ELEMENTS.map((element) => (
              <NewElement
                key={element.tag}
                tag={element.tag as FrameTag}
                type="new_element"
                className={element.tag}
              >
                <Card className="shadow-none active:cursor-grabbing">
                  <CardHeader>
                    <CardTitle>{element.display}</CardTitle>
                    <CardDescription>
                      {element.tag === "section"
                        ? "This frame can have multiple Sections"
                        : `This frame can only have 1 ${element.display}`}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </NewElement>
            ))}
          </div>

          <div
            ref={ref}
            className="flex h-full w-full flex-col gap-4 overflow-y-auto rounded-xl border p-4"
          >
            <FrameCanvas frame={frame} updateFrame={updateFrame} />
          </div>
        </div>
      </UIBuilder>

      <div className="flex items-center justify-end gap-x-4 border-b py-4">
        <Button variant="link" onClick={() => router.back()}>
          Go Back
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">Save Frame</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Create new Frame</DialogTitle>
              <DialogDescription className="flex gap-1">
                <span>Use this frame as base template in</span>
                <Button variant="link" className="p-0" asChild>
                  <Link href="/pages" className="h-auto" target="_blank">
                    Page
                  </Link>
                </Button>
                <span>section.</span>
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2 py-4">
              <Input
                placeholder="Enter frame name here"
                value={frameName}
                onChange={(event) => setFrameName(event.currentTarget.value)}
              />
              <div className="text-sm text-transparent/80">
                Note: The spaces in Name will be replaced by dashes {"(-)"}.
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleSaving}
                disabled={!isSignedIn || frameName.length === 0}
              >
                Create Frame
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
