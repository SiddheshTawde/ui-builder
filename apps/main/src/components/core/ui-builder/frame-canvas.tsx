"use client";

import React from "react";
import { useDrop } from "react-dnd";

import { Frame, Tag } from "@root/types/frame.type";
import { Card, CardHeader, CardTitle } from "@root/components/ui/card";

type FrameCanvasProps = {
  frame: Frame;
  updateFrame: React.Dispatch<React.SetStateAction<Frame>>;
};

export const FrameCanvas = ({ frame, updateFrame }: FrameCanvasProps) => {
  const ref = React.useRef(null);

  const handleDrop = ({ type }: { type: Tag; dispay: string }) => {
    const updated = frame;

    if (type !== "section") {
      updated[type] = { render: true };
    }

    if (type === "section") {
      updated.main = {
        ...updated.main,
        ["section-" + (Object.keys(updated.main).length + 1)]: {
          render: true,
        },
      };
    }

    updateFrame(updated);
  };

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ["aside", "footer", "header", "nav", "section"],
      drop: handleDrop,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [],
  );

  React.useEffect(() => {
    if (ref.current) {
      drop(ref.current);
    }
  }, [drop]);

  return (
    <div ref={ref} className="relative h-full w-full">
      <div className="flex h-full w-full flex-col gap-4 border p-4">
        {frame.header?.render ? (
          <Card className="bg-transparent/5 text-center">
            <CardHeader>
              <CardTitle>Header</CardTitle>
            </CardHeader>
          </Card>
        ) : null}
        {frame.nav?.render ? (
          <Card className="flex items-center justify-center bg-transparent/5 text-center">
            <CardHeader>
              <CardTitle>Nav</CardTitle>
            </CardHeader>
          </Card>
        ) : null}

        <main className="flex flex-1 flex-row items-stretch gap-x-4">
          {frame.aside?.render ? (
            <Card className="flex w-[25%] items-center justify-center bg-transparent/5 text-center">
              <CardHeader>
                <CardTitle>Aside</CardTitle>
              </CardHeader>
            </Card>
          ) : null}

          <div className="flex flex-1 flex-col gap-y-4">
            {Object.keys(frame.main).map((section) =>
              frame.main[section].render ? (
                <Card
                  key={section}
                  className="flex flex-1 items-center justify-center bg-transparent/5 text-center"
                >
                  <CardHeader>
                    <CardTitle className="capitalize">{section.replaceAll("-", " ")}</CardTitle>
                  </CardHeader>
                </Card>
              ) : null,
            )}
          </div>
        </main>

        {frame.footer?.render ? (
          <Card className="bg-transparent/5 text-center">
            <CardHeader>
              <CardTitle>Footer</CardTitle>
            </CardHeader>
          </Card>
        ) : null}
      </div>

      {isOver && (
        <div className="absolute left-0 top-0 z-10 h-full w-full bg-transparent/5" />
      )}
    </div>
  );
};
