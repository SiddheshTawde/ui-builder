"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { supabase } from "@root/supabase/server";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@root/components/ui/alert-dialog";
import { Button } from "@root/components/ui/button";
import { toast } from "@root/components/ui/use-toast";
import { SaveDialog } from "@root/components/core/save-dialog";
import { DragElement, DropCanvas } from "@root/components/core/ui-builder";

import { Frame } from "@root/types/frame.type";
import { Json } from "@root/supabase/supabase.types";

import { FRAME_ELEMENTS } from "@root/constants/frame-elements";

import "../frame-canvas.css";

export default function Page() {
  const router = useRouter();
  const { user, isSignedIn } = useUser();

  const [frameName, setFrameName] = useState("");
  const [frame, updateFrame] = useState<Frame[]>([]);
  const [showSaveDialog, toggleSaveDialog] = useState(false);

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

  const handleGoBack = () => {
    if (frame.length === 0) {
      router.back();
    } else {
      toggleSaveDialog(true);
    }
  };

  return (
    <main className="container mx-auto flex h-[calc(100vh-64px)] flex-col">
      <div className="mt-4 flex flex-1 items-stretch gap-x-4">
        <div className="flex w-48 flex-col gap-y-4 overflow-y-auto">
          <p className="text-lg font-semibold">Frame Elements:</p>
          {FRAME_ELEMENTS.map((element) => (
            <DragElement key={element.display} element={element}>
              {element.display}
            </DragElement>
          ))}
        </div>

        <div className="flex w-full flex-1 flex-col gap-4">
          <div className="flex h-7 w-full items-center gap-2">
            <p className="text-sm font-medium">Selected Template:</p>
          </div>
          <DropCanvas frame={frame} updateFrame={updateFrame} />
        </div>
      </div>

      <div className="flex items-center justify-end gap-x-4 border-b py-4">
        <Button variant="link" onClick={handleGoBack}>
          Go Back
        </Button>

        <SaveDialog
          isSignedIn={isSignedIn}
          frameName={frameName}
          handleSaving={handleSaving}
          setFrameName={setFrameName}
        />
      </div>

      <AlertDialog open={showSaveDialog} onOpenChange={toggleSaveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Frame</AlertDialogTitle>
            <AlertDialogDescription>
              Going Back without saving will Discard current Frame setup.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => router.back()}>
              Discard and Go Back
            </AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
