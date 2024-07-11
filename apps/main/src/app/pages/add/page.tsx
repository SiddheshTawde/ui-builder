"use client";

import React from "react";
import Link from "next/link";
import router from "next/router";
import { useUser } from "@clerk/nextjs";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog";
import { NewElement, UIBuilder } from "@root/components/core/ui-builder";
import { Button } from "@root/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@root/components/ui/card";

import { Input } from "@root/components/ui/input";
import { toast } from "@root/components/ui/use-toast";
import { DialogHeader, DialogFooter } from "@root/components/ui/dialog";

import { FRAME_ELEMENTS } from "@root/constants/frame-elements";

import { supabase } from "@root/supabase/server";
import { FrameTag } from "@root/types/frame.type";
import { Json, Tables } from "@root/supabase/supabase.types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@root/components/ui/select";

export default function AddPage() {
  const ref = React.useRef(null);
  const { user, isSignedIn } = useUser();
  const [pageName, setPageName] = React.useState("");
  const [page, updatePage] = React.useState([]);

  const [selectedFrame, setSelectedFrame] = React.useState("");
  const [frames, updateFrames] = React.useState<Tables<"frames">[]>([]);

  React.useEffect(() => {
    supabase
      .from("frames")
      .select("*")
      .then(({ data, error }) => {
        if (error) {
        }

        if (data === null) {
          updateFrames([]);
        } else {
          updateFrames(data);
        }
      });
  }, []);

  const handleSaving = async () => {
    const { error } = await supabase
      .from("pages")
      .insert({
        name: pageName.replaceAll(" ", "-").toLowerCase(),
        template: page as never as Json,
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
        : "Added new frame to library: " + pageName,
      variant: error ? "destructive" : "default",
    });
  };

  return (
    <main className="container mx-auto flex h-[calc(100vh-64px)] flex-col">
      <UIBuilder>
        <div className="mt-4 flex flex-1 items-stretch gap-x-4">
          <div className="flex w-96 flex-col gap-y-4 overflow-y-auto">
            <p className="text-lg font-semibold">Page Components:</p>
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

          <div className="flex w-full flex-1 flex-col gap-4">
            <div className="flex w-full items-center gap-2">
              <p className="text-sm font-medium">Select a frame:</p>
              <Select value={selectedFrame} onValueChange={setSelectedFrame}>
                <SelectTrigger className="h-7 w-fit border-none p-0 shadow-none">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    {frames.map((frame) => (
                      <SelectItem key={frame.id} value={frame.id}>
                        {frame.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div
              ref={ref}
              className="flex h-full w-full flex-col gap-4 overflow-y-auto rounded-xl border p-4"
            ></div>
          </div>
        </div>
      </UIBuilder>

      <div className="flex items-center justify-end gap-x-4 border-b py-4">
        <Button variant="link" onClick={() => router.back()}>
          Go Back
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">Save Page</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Create new Page</DialogTitle>
              <DialogDescription className="flex gap-1">
                <span>Use this page as a part of the</span>
                <Button variant="link" className="p-0" asChild>
                  <Link href="/workflows" className="h-auto" target="_blank">
                    Workflow
                  </Link>
                </Button>
                <span>section.</span>
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2 py-4">
              <Input
                placeholder="Enter frame name here"
                value={pageName}
                onChange={(event) => setPageName(event.currentTarget.value)}
              />
              <div className="text-sm text-transparent/80">
                Note: The spaces in Name will be replaced by dashes {"(-)"}.
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleSaving}
                disabled={!isSignedIn || pageName.length === 0}
              >
                Create Page
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
