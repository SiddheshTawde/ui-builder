"use client";

import React from "react";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type SaveDialogProps = {
  frameName: string;
  setFrameName: React.Dispatch<React.SetStateAction<string>>;
  handleSaving: () => Promise<void>;
  isSignedIn: boolean | undefined;
};

export function SaveDialog(props: SaveDialogProps) {
  return (
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
            value={props.frameName}
            onChange={(event) => props.setFrameName(event.currentTarget.value)}
          />
          <div className="text-sm text-transparent/80">
            Note: The spaces in Name will be replaced by dashes {"(-)"}.
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={props.handleSaving}
            disabled={!props.isSignedIn || props.frameName.length === 0}
          >
            Create Frame
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
