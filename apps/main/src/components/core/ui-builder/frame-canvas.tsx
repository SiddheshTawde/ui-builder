"use client";

import React from "react";
import { useDrop } from "react-dnd";

import { Frame, FrameTag } from "@root/types/frame.type";
import {
  createFrame,
  findOrCreateMainFrame,
  removeElementById,
  renderElement,
} from "@root/lib/utils";

type FrameCanvasProps = {
  frame: Frame[];
  updateFrame: React.Dispatch<React.SetStateAction<Frame[]>>;
};

type handleDropType = {
  type: "new_element" | "reorder";
  tag: FrameTag;
  display: string;
};

export const FrameCanvas = ({ frame, updateFrame }: FrameCanvasProps) => {
  const ref = React.useRef(null);

  const handleDrop = ({ tag, type }: handleDropType) => {
    const updatedFrames: Frame[] = [...frame];

    if (type !== "new_element") {
      updateFrame(updatedFrames);
      return;
    }

    if (tag !== "aside" && tag !== "section") {
      updatedFrames.push(createFrame(tag, tag));
      updateFrame(updatedFrames);
      return;
    }

    const mainFrame = findOrCreateMainFrame(updatedFrames);
    const newChildFrame = createFrame(tag, tag);

    if (tag === "section") {
      const sectionDivFrame = mainFrame.children.find(
        (child) => child.tag === "div",
      );

      if (sectionDivFrame) {
        sectionDivFrame.children.push(newChildFrame);
      } else {
        const newSectionDivFrame = createFrame("div");
        newSectionDivFrame.children.push(newChildFrame);
        mainFrame.children.push(newSectionDivFrame);
      }
    } else {
      mainFrame.children.push(newChildFrame);
    }

    updateFrame(updatedFrames);
  };

  const removeElement = (id: string) => {
    updateFrame(removeElementById([...frame], id));
  };

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ["new_element", "reorder"],
      drop: handleDrop,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [frame, updateFrame],
  );

  React.useEffect(() => {
    if (ref.current) {
      drop(ref.current);
    }
  }, [drop]);

  return (
    <div
      ref={ref}
      id="frame-canvas"
      className="relative flex h-full w-full flex-col gap-4"
    >
      {frame.map((node) => renderElement(node, removeElement))}

      {isOver && (
        <div className="absolute left-0 top-0 z-10 h-full w-full rounded-lg bg-transparent/5" />
      )}

      {Object.keys(frame).length === 0 ? (
        <div className="flex h-full w-full items-center justify-center text-sm text-transparent/60">
          Drag & Drop frame elements here.
        </div>
      ) : null}
    </div>
  );
};
