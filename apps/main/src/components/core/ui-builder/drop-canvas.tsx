"use client";

import React, { DragEventHandler, MouseEventHandler } from "react";

import { RenderElement } from "@root/lib/render-element";
import {
  createFrameElement,
  findNodeById,
  insertFrameAtPosition,
  removeElementById,
} from "@root/lib/frame-manipulation";

import { Frame, FrameElement } from "@root/types/frame.type";
import { cn } from "@root/lib/utils";
import { findIndex } from "lodash";

export type DropCanvasProps = {
  frame: Frame[];
  updateFrame: React.Dispatch<React.SetStateAction<Frame[]>>;
};

export type HoverPositionTypes = "top" | "right" | "bottom" | "left" | null;

export const DropCanvas = ({ frame, updateFrame }: DropCanvasProps) => {
  const [hoveredElement, setHoveredElement] = React.useState("");

  const handleDragOver: DragEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setHoveredElement(event.currentTarget.id);
  };

  const handleMouseEnter: MouseEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setHoveredElement(event.currentTarget.id);
  };
  const handleMouseOver: MouseEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setHoveredElement(event.currentTarget.id);
  };
  const handleMouseLeave: MouseEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setHoveredElement("");
  };

  const handleDrop: DragEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const target = event.currentTarget.id;
    const element: FrameElement = JSON.parse(
      event.dataTransfer.getData("text"),
    );

    const updated = [...frame];

    if (element.id) {
      if (element.id !== event.currentTarget.id) {
        if (target === "root-canvas") {
          updated.push(
            createFrameElement(element.tag, element.display, element.className),
          );
        } else {
          const parent = findNodeById(frame, target);

          if (parent) {
            parent.children.push(
              createFrameElement(
                element.tag,
                element.display,
                element.className,
              ),
            );
          }
        }
      }
    } else {
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
    }

    updateFrame(updated);
  };

  const handleAreaDrop: DragEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const target = event.currentTarget.id.split("_");
    const element: FrameElement = JSON.parse(
      event.dataTransfer.getData("text"),
    );

    if (target[1] === "top" || target[1] === "left") {
      const node = findNodeById(frame, target[0]);

      if (node) {
        const insertElement = createFrameElement(
          element.tag,
          element.display,
          element.className,
        );
        updateFrame(
          insertFrameAtPosition(frame, node.id, insertElement, "before"),
        );
      }
    }
    if (target[1] === "bottom" || target[1] === "right") {
      const node = findNodeById(frame, target[0]);

      if (node) {
        const insertElement = createFrameElement(
          element.tag,
          element.display,
          element.className,
        );
        updateFrame(
          insertFrameAtPosition(frame, node.id, insertElement, "after"),
        );
      }
    }
  };

  const removeElement = (id: string) => {
    updateFrame(removeElementById([...frame], id));
  };

  return (
    <div
      id="root-canvas"
      className={cn(
        "flex h-full w-full flex-col rounded border p-2 transition-all",
        { "border-indigo-400": hoveredElement === "root-canvas" },
      )}
      onDragOver={handleDragOver}
      onMouseOver={handleMouseOver}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onDrop={handleDrop}
    >
      {frame.map((node) => (
        <RenderElement
          key={node.id}
          node={node}
          hoveredElement={hoveredElement}
          handleDrop={handleDrop}
          handleAreaDrop={handleAreaDrop}
          handleDragOver={handleDragOver}
          handleMouseOver={handleMouseOver}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          removeElement={removeElement}
        />
      ))}
    </div>
  );
};
