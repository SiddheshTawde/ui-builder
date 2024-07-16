import React, { MouseEventHandler } from "react";

import { cn } from "./utils";

import { Frame } from "@root/types/frame.type";
import { PageJson } from "@root/types/page-json.type";
import { DeleteElement } from "@root/components/core/frame-actions/delete-element";
import { FLOW_CONTENT } from "@root/constants";
import { toast } from "@root/components/ui/use-toast";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@root/components/ui/button";

export function renderHTML(nodes: PageJson[], parent: HTMLElement) {
  nodes.forEach((node) => {
    const element = document.createElement(node.tag);

    Object.entries(node.attributes).forEach(([attribute, value]) => {
      (element as any)[attribute] = value;
    });

    renderHTML(node.children, element);

    parent.appendChild(element);
  });
}
type RenderFrameProps = {
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

export function RenderElement(props: RenderFrameProps) {
  const [hoveringPosition, setHoveringPosition] =
    React.useState<HoverPositionTypes>(null);

  console.log({ hoveringPosition });

  return (
    <>
      <div
        className={cn(
          "h-0 w-full overflow-hidden border-0 border-dashed bg-indigo-400/5 transition-all",
          {
            "h-12 border": hoveringPosition === "top",
          },
        )}
        onDragOver={props.handleDragOver}
        onMouseOver={props.handleMouseOver}
        onMouseEnter={props.handleMouseEnter}
        onMouseLeave={props.handleMouseLeave}
      >
        Add Element Here
      </div>
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
          const target = event.currentTarget;
          const { clientX, clientY } = event;

          const { top, left, right, bottom } = target.getBoundingClientRect();
          const dropArea = 100; // 100px drop area

          if (clientY < top + dropArea) {
            setHoveringPosition("top");
          } else if (clientY > bottom - dropArea) {
            setHoveringPosition("bottom");
          } else if (clientX < left + dropArea) {
            setHoveringPosition("left");
          } else if (clientX > right - dropArea) {
            setHoveringPosition("right");
          } else {
            setHoveringPosition(null);
          }
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
          "relative flex flex-1 flex-col items-stretch rounded border p-1 pb-6 transition-all",
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
        <Button
          variant="link"
          onDragOver={(event) => event.preventDefault()}
          className="absolute left-0 right-0 top-0 m-auto h-fit w-fit gap-x-2 p-2"
        >
          <PlusIcon className="h-4 w-4" />
          <span className="text-xs">Add Above</span>
        </Button>

        <Button
          variant="link"
          className="absolute bottom-0 left-0 right-0 m-auto h-fit w-fit gap-x-2 p-2"
        >
          <PlusIcon className="h-4 w-4" />
          <span className="text-xs">Add Below</span>
        </Button>

        <div className="flex items-center gap-x-2">
          <p className="text-sm">{props.node.title}</p>
          <DeleteElement
            id={props.node.id}
            removeElement={props.removeElement}
          />
        </div>

        <div
          className={cn("flex flex-1 flex-col items-stretch gap-1", {
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

      <div
        className={cn(
          "h-0 w-full overflow-hidden border-0 border-dashed bg-indigo-400/5 transition-all",
          {
            "h-12 border": hoveringPosition === "bottom",
          },
        )}
        onDragOver={props.handleDragOver}
        onMouseOver={props.handleMouseOver}
        onMouseEnter={props.handleMouseEnter}
        onMouseLeave={props.handleMouseLeave}
      >
        Add Element Here
      </div>
    </>
  );
}
