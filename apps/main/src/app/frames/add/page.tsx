"use client";

import { useUser } from "@clerk/nextjs";
import {
  UIBuilder,
  DraggableElement,
  FrameCanvas,
} from "@root/components/core/ui-builder";

import { Button } from "@root/components/ui/button";
import {
  Card,
  CardContent,
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
import { Input } from "@root/components/ui/input";
import { Label } from "@root/components/ui/label";
import { toast } from "@root/components/ui/use-toast";

import { FRAME_ELEMENTS } from "@root/constants/frame-elements";
import { supabase } from "@root/supabase/server";
import { Frame, Tag } from "@root/types/frame.type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddNewFrame() {
  const router = useRouter();
  const { user, isSignedIn } = useUser();
  const [frame, updateFrame] = useState<Frame>({ main: {} });
  const [frameName, setFrameName] = useState("");

  const handleSaving = async () => {
    const { error } = await supabase
      .from("frames")
      .insert({
        name: frameName.replaceAll(" ", "-").toLowerCase(),
        template: frame,
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
              <DraggableElement key={element.tag} type={element.tag as Tag}>
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
              </DraggableElement>
            ))}
          </div>

          <div className="flex h-full w-full flex-col gap-4 overflow-y-auto">
            <FrameCanvas frame={frame} updateFrame={updateFrame} />
          </div>
        </div>
      </UIBuilder>
      <div className="flex items-center justify-end gap-x-4 border-b py-4">
        <Button variant="link" onClick={() => router.back()}>
          Cancel
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
