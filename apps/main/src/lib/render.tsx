import React, { createElement, MouseEventHandler } from "react";

import { cn, generateUUID } from "./utils";

import { PlusIcon } from "@heroicons/react/24/outline";
import { Frame } from "@root/types/frame.type";
import { PageJson } from "@root/types/page-json.type";
import { FrameAction } from "@root/components/core/frame-actions";

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

// export function renderElement(
//   node: Frame,
//   hoveredElement: string,
//   handleDrop: React.DragEventHandler<HTMLElement>,
//   handleDragOver: React.DragEventHandler<HTMLElement>,
//   handleMouseEnter: MouseEventHandler<HTMLElement>,
//   handleMouseLeave: MouseEventHandler<HTMLElement>,
//   removeElement: (id: string) => void,
// ): React.ReactNode {
//   return React.createElement(
//     node.tag,
//     {
//       key: node.id,
//       id: node.id,
//       style: {},
//       className: cn(
//         "rounded-xl border bg-card text-card-foreground shadow-none relative rounded-tl-none transition-all",
//         [node.className, "group/" + node.title],
//         { "border-primary/20 bg-primary/5": hoveredElement === node.id },
//         { "h-12": node.tag === "nav" },
//         { "h-16": node.tag === "header" || node.tag === "footer" },
//         { "flex-1 p-1 pt-8": node.tag === "main" },
//         { "flex-1 p-1 pt-8": node.tag === "div" },
//         { "flex-1": node.tag === "section" },
//         { "w-56": node.tag === "aside" },
//       ),
//       onDragOver: handleDragOver,
//       onDrop: handleDrop,
//       onMouseEnter: handleMouseEnter,
//       onMouseLeave: handleMouseLeave,
//     },
//     node.children.length > 0
//       ? [
//           ...node.children.map((n) =>
//             renderElement(
//               n,
//               hoveredElement,
//               handleDrop,
//               handleDragOver,
//               handleMouseEnter,
//               handleMouseLeave,
//               removeElement,
//             ),
//           ),
//           <FrameAction
//             key={node.id}
//             node={node}
//             hoveredElement={hoveredElement}
//             removeElement={removeElement}
//           />,
//         ]
//       : [
//           <FrameAction
//             key={node.id}
//             node={node}
//             hoveredElement={hoveredElement}
//             removeElement={removeElement}
//           />,
//         ],
//   );
// }

type RenderFrameProps = {
  node: Frame;
  hoveredElement: string;
  handleDrop: React.DragEventHandler<HTMLElement>;
  handleDragOver: React.DragEventHandler<HTMLElement>;
  handleMouseEnter: MouseEventHandler<HTMLElement>;
  handleMouseLeave: MouseEventHandler<HTMLElement>;
  removeElement: (id: string) => void;
};

export function RenderFrame(props: RenderFrameProps) {
  return createElement(
    props.node.tag,
    {
      key: props.node.id,
      id: props.node.id,
      style: {},
      className: cn(
        "rounded-xl border bg-card text-card-foreground shadow-none relative rounded-tl-none transition-all",
        [props.node.className, "group/" + props.node.title],
        {
          "border-primary/20 bg-primary/5":
            props.hoveredElement === props.node.id,
        },
        { "h-12": props.node.tag === "nav" },
        {
          "h-16": props.node.tag === "header" || props.node.tag === "footer",
        },
        { "flex-1 p-1 pt-8": props.node.tag === "main" },
        { "flex-1 p-1 pt-8": props.node.tag === "div" },
        { "flex-1": props.node.tag === "section" },
        { "w-56": props.node.tag === "aside" },
      ),
      onDrop: props.handleDrop,
      onDragOver: props.handleDragOver,
      onMouseEnter: props.handleMouseEnter,
      onMouseLeave: props.handleMouseLeave,
    },
    props.node.children.length > 0
      ? [
          ...props.node.children.map((n) => (
            <RenderFrame
              key={n.id}
              node={n}
              hoveredElement={props.hoveredElement}
              handleDrop={props.handleDrop}
              handleDragOver={props.handleDragOver}
              handleMouseEnter={props.handleMouseEnter}
              handleMouseLeave={props.handleMouseLeave}
              removeElement={props.removeElement}
            />
          )),
          <FrameAction
            key={props.node.id}
            node={props.node}
            hoveredElement={props.hoveredElement}
            removeElement={props.removeElement}
          />,
        ]
      : [
          <FrameAction
            key={props.node.id}
            node={props.node}
            hoveredElement={props.hoveredElement}
            removeElement={props.removeElement}
          />,
        ],
  );
}
