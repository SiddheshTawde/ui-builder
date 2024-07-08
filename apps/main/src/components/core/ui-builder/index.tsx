"use client";

import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
export { DraggableElement } from "./draggable-element";
export { FrameCanvas } from "./frame-canvas";

export interface UIBuilderProps extends React.PropsWithChildren {}

export function UIBuilder(props: UIBuilderProps) {
  return <DndProvider backend={HTML5Backend}>{props.children}</DndProvider>;
}
