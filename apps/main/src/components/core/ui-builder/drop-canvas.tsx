"use client";

import React, { DragEventHandler } from "react";

import { renderElement } from "@root/lib/render";
import { createFrameElement, findNodeById } from "@root/lib/frame-manipulation";

import { Frame, FrameElement } from "@root/types/frame.type";

export type DropCanvasProps = {
  frame: Frame[];
  updateFrame: React.Dispatch<React.SetStateAction<Frame[]>>;
};

export const DropCanvas = ({ frame, updateFrame }: DropCanvasProps) => {
  const handleDragOver: DragEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop: DragEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const target = event.currentTarget.id;
    const element: FrameElement = JSON.parse(
      event.dataTransfer.getData("text"),
    );

    const updated = [...frame];

    if (target === "root-canvas") {
      updated.push(
        createFrameElement(element.tag, element.display, element.className),
      );
    } else {
      const parent = findNodeById(frame, target);

      if (parent) {
        parent.children.push(
          createFrameElement(element.tag, element.display, element.className),
        );
      }
    }

    updateFrame(updated);
  };

  return (
    <div
      id="root-canvas"
      className="flex h-full w-full flex-col rounded-xl border p-4 gap-2"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {frame.map((node) => renderElement(node, handleDrop, handleDragOver))}
    </div>
  );
};
