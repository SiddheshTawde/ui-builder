import React from "react";
import { useDrag } from "react-dnd";

import { Tag } from "@root/app/frames/add/page";

export interface DraggableElementProps extends React.PropsWithChildren {
  type: Tag;
}

export function DraggableElement({ type, children }: DraggableElementProps) {
  const ref = React.useRef(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { type, dispay: children },
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
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="flex items-center justify-between border bg-transparent/5 px-4 py-2"
    >
      {children}
    </div>
  );
}
