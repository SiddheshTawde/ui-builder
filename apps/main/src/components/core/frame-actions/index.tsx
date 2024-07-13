import { cn } from "@root/lib/utils";
import { DeleteElement } from "./delete-element";
import { Frame } from "@root/types/frame.type";
import React from "react";

type FrameActionProps = {
  node: Frame;
  hoveredElement: string;
  removeElement: (id: string) => void;
};

export function FrameAction(props: FrameActionProps) {
  return (
    <div
      className={cn(
        "absolute left-[-1px] top-[-25px] z-10 flex items-center gap-2 rounded-tl rounded-tr border-l border-r border-t bg-card px-2 py-1 transition-all",
        {
          "border-primary/20 bg-primary/5":
            props.hoveredElement === props.node.id,
        },
      )}
      draggable={true}
      onDragStart={(event) => {
        event.dataTransfer.setData(
          "text/plain",
          JSON.stringify({
            id: props.node.id,
            tag: props.node.tag,
            display: props.node.title,
            className: props.node.className,
          }),
        );
      }}
    >
      <span
        className={cn("text-xs", {
          "text-primary": props.hoveredElement === props.node.id,
        })}
      >
        {props.node.title}
      </span>
      {props.hoveredElement === props.node.id ? (
        <DeleteElement id={props.node.id} removeElement={props.removeElement} />
      ) : null}
    </div>
  );
}
