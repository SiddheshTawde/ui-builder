import React, { MouseEventHandler } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

import { toast } from "@root/components/ui/use-toast";
import { DeleteElement } from "@root/components/core/frame-actions/delete-element";

import { cn } from "./utils";
import { FLOW_CONTENT } from "@root/constants";

import { Frame } from "@root/types/frame.type";

type RenderElementProps = {
  node: Frame;
  hoveredElement: string;
  handleDrop: React.DragEventHandler<HTMLElement>;
  handleDragOver: React.DragEventHandler<HTMLElement>;
  handleMouseOver: MouseEventHandler<HTMLElement>;
  handleMouseEnter: MouseEventHandler<HTMLElement>;
  handleMouseLeave: MouseEventHandler<HTMLElement>;
  removeElement: (id: string) => void;
};

type HoverPositionTypes = "top" | "right" | "bottom" | "left" | null;

export function RenderElement(props: RenderElementProps) {
  const [hoveringPosition, setHoveringPosition] =
    React.useState<HoverPositionTypes>(null);

  const handleAreaDrop = (
    position: Exclude<HoverPositionTypes, null>,
    event: React.DragEvent<HTMLElement>,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setHoveringPosition(null);
  };

  const handleLocalDragOver = (event: React.DragEvent<HTMLElement>) => {
    event.stopPropagation();
    const target = event.currentTarget;
    const { clientX, clientY } = event;

    const { top, left, right, bottom } = target.getBoundingClientRect();
    const DROPAREA = 8; // 8px drop area

    if (clientY < top + DROPAREA && props.node.title !== "Column") {
      setHoveringPosition("top");
    } else if (clientY > bottom - DROPAREA && props.node.title !== "Column") {
      setHoveringPosition("bottom");
    } else if (clientX < left + DROPAREA && props.node.title === "Column") {
      setHoveringPosition("left");
    } else if (clientX > right - DROPAREA && props.node.title === "Column") {
      setHoveringPosition("right");
    } else {
      setHoveringPosition(null);
    }
  };

  return (
    <>
      <div
        className={cn(
          "flex h-0 w-0 items-center justify-center overflow-hidden border-0 border-dashed bg-indigo-400/5 transition-all",
          {
            "h-12 w-full border": hoveringPosition === "top",
          },
        )}
        onDrop={(event) => handleAreaDrop("top", event)}
        onDragOver={props.handleDragOver}
        onMouseOver={(event) => {
          if (event.currentTarget.id !== props.node.id) {
            setHoveringPosition(null);
          }
        }}
        onMouseLeave={() => setHoveringPosition(null)}
      >
        <PlusIcon className="h-6 w-6" />
      </div>
      <div
        className={cn(
          "flex h-0 w-0 items-center justify-center overflow-hidden border-0 border-dashed bg-indigo-400/5 transition-all",
          {
            "h-full w-12 border": hoveringPosition === "left",
          },
        )}
        onDrop={(event) => handleAreaDrop("left", event)}
        onDragOver={props.handleDragOver}
        onMouseOver={(event) => {
          if (event.currentTarget.id !== props.node.id) {
            setHoveringPosition(null);
          }
        }}
        onMouseLeave={() => setHoveringPosition(null)}
      >
        <PlusIcon className="h-6 w-6" />
      </div>

      {/* Main Card -- START */}
      <div
        id={props.node.id}
        key={props.node.id}
        onDrop={(event) => {
          event.stopPropagation();

          if (!FLOW_CONTENT.includes(props.node.title)) {
            props.handleDrop(event);
          } else {
            toast({
              description: "Cannot add a child element to " + props.node.title,
            });
          }
        }}
        onDragOver={(event) => {
          handleLocalDragOver(event);
          props.handleDragOver(event);
        }}
        onMouseOver={(event) => {
          if (event.currentTarget.id !== props.node.id) {
            setHoveringPosition(null);
          }
          props.handleMouseOver(event);
        }}
        onMouseEnter={props.handleMouseEnter}
        onMouseLeave={props.handleMouseLeave}
        className={cn(
          "relative flex flex-1 flex-col items-stretch rounded border p-2 transition-all",
          [props.node.title],
          {
            "max-h-16":
              props.node.title === "Header" || props.node.title === "Footer",
          },
          { "max-h-12": props.node.title === "Nav" },
          {
            "border-indigo-400 shadow shadow-indigo-400":
              props.hoveredElement === props.node.id,
          },
        )}
      >
        <div className="flex items-center gap-x-2">
          <p className="text-sm">{props.node.title}</p>
          <DeleteElement
            id={props.node.id}
            removeElement={props.removeElement}
          />
        </div>

        <div
          className={cn("flex flex-1 flex-col items-stretch", {
            "flex-row": props.node.title === "Row",
          })}
        >
          {props.node.children.map((node) => (
            <RenderElement
              key={node.id}
              node={node}
              hoveredElement={props.hoveredElement}
              handleDrop={props.handleDrop}
              handleDragOver={props.handleDragOver}
              handleMouseOver={props.handleMouseOver}
              handleMouseEnter={props.handleMouseEnter}
              handleMouseLeave={props.handleMouseLeave}
              removeElement={props.removeElement}
            />
          ))}
        </div>
      </div>
      {/* Main Card -- END */}

      <div
        className={cn(
          "flex h-0 w-0 items-center justify-center overflow-hidden border-0 border-dashed bg-indigo-400/5 transition-all",
          {
            "h-full w-12 border": hoveringPosition === "right",
          },
        )}
        onDrop={(event) => handleAreaDrop("right", event)}
        onDragOver={props.handleDragOver}
        onMouseOver={(event) => {
          if (event.currentTarget.id !== props.node.id) {
            setHoveringPosition(null);
          }
        }}
        onMouseLeave={() => setHoveringPosition(null)}
      >
        <PlusIcon className="h-6 w-6" />
      </div>

      <div
        className={cn(
          "flex h-0 w-0 items-center justify-center overflow-hidden border-0 border-dashed bg-indigo-400/5 transition-all",
          {
            "h-12 w-full border": hoveringPosition === "bottom",
          },
        )}
        onDrop={(event) => handleAreaDrop("bottom", event)}
        onDragOver={props.handleDragOver}
        onMouseOver={(event) => {
          if (event.currentTarget.id !== props.node.id) {
            setHoveringPosition(null);
          }
        }}
        onMouseLeave={() => setHoveringPosition(null)}
      >
        <PlusIcon className="h-6 w-6" />
      </div>
    </>
  );
}
