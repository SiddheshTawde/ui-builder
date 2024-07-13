"use client";

import React from "react";
import { Card, CardHeader, CardTitle } from "@root/components/ui/card";

import { FrameElement } from "@root/types/frame.type";

export interface DragElementProps extends React.PropsWithChildren {
  element: FrameElement;
}

export function DragElement({ element }: DragElementProps) {
  return (
    <Card
      draggable={true}
      onDragStart={(event) =>
        event.dataTransfer.setData("text/plain", JSON.stringify(element))
      }
      className="cursor-pointer shadow-none active:cursor-grabbing"
    >
      <CardHeader>
        <CardTitle>{element.display}</CardTitle>
      </CardHeader>
    </Card>
  );
}
