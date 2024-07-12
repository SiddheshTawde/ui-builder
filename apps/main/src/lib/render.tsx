import React from "react";

import { cn, generateUUID } from "./utils";
import { Frame } from "@root/types/frame.type";
import { PageJson } from "@root/types/page-json.type";

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

export function renderElement(
  node: Frame,
  handleDrop: React.DragEventHandler<HTMLElement>,
  handleDragOver: React.DragEventHandler<HTMLElement>,
  removeElement?: (id: string) => void,
): React.ReactNode {
  return React.createElement(
    node.tag,
    {
      id: node.id,
      key: generateUUID(),
      style: {},
      className: cn(
        "rounded-xl border bg-card text-card-foreground shadow-none relative",
        [node.className],
        { "h-12": node.tag === "nav" },
        { "h-16": node.tag === "header" || node.tag === "footer" },
        { "flex-1 p-2": node.tag === "main" },
        { "flex-1 p-2": node.tag === "div" },
        { "flex-1": node.tag === "section" },
        { "w-56": node.tag === "aside" },
      ),
      onDragOver: (event: React.DragEvent<HTMLElement>) =>
        handleDragOver(event),
      onDrop: (event: React.DragEvent<HTMLElement>) => handleDrop(event),
    },
    node.children.length > 0
      ? node.children.map((n) =>
          renderElement(n, handleDrop, handleDragOver, removeElement),
        )
      : null,
    node.title,
  );
}
