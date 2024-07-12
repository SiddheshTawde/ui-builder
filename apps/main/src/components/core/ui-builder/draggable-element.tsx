"use client";

import React from "react";
import { Card, CardHeader, CardTitle } from "@root/components/ui/card";

export interface DragElementProps extends React.PropsWithChildren {
  element: { display: string; tag: string; className: string };
}

export function DragElement({ element }: DragElementProps) {
  return (
    <Card
      draggable={true}
      onDragStart={(event) =>
        event.dataTransfer.setData("text/plain", JSON.stringify(element))
      }
    >
      <CardHeader>
        <CardTitle>{element.display}</CardTitle>
      </CardHeader>
    </Card>
  );
}
