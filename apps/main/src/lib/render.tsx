import { createElement, ReactNode } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";

import { Card } from "@root/components/ui/card";
import { Button } from "@root/components/ui/button";

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
  removeElement?: (id: string) => void,
): ReactNode {
  if (node.tag === "div") {
    return createElement(
      node.tag,
      { key: node.id, style: { ...node.style } },
      node.children.length > 0
        ? node.children.map((n) => renderElement(n, removeElement))
        : null,
      node.title,
    );
  } else {
    return (
      <div key={node.id} className={node.tag}>
        <Card className="relative flex h-full w-full p-2 capitalize">
          {removeElement ? (
            <div className="absolute right-0 top-0 z-10 !h-fit !w-fit">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => removeElement && removeElement(node.id)}
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          ) : null}
          {createElement(
            node.tag,
            { style: node.style },
            node.children.length > 0
              ? node.children.map((n) => renderElement(n, removeElement))
              : null,
            node.title,
          )}
        </Card>
      </div>
    );
  }
}
