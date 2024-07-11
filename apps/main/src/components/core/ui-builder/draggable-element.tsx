"use client";

import { FrameTag } from "@root/types/frame.type";
import React from "react";
import { useDrag } from "react-dnd";

export interface NewElementProps extends React.PropsWithChildren {
  type: "new_element" | "reorder";
  tag: FrameTag;
  className: string;
}

export function NewElement({
  className,
  type,
  tag,
  children,
}: NewElementProps) {
  const ref = React.useRef(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { type, tag, dispay: children },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  React.useEffect(() => {
    if (ref.current) {
      drag(ref.current);
    }
  }, [drag]);

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? "grabbing" : "default",
      }}
      className={className}
    >
      {children}
    </div>
  );
}
