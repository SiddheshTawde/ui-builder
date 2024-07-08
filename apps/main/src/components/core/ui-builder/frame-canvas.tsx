// Canvas.tsx
import React from "react";
import { useDrop } from "react-dnd";
import { Frame, Tag } from "@root/app/frames/add/page";

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
        {frame.header.render ? (
          <div className="flex h-16 items-center justify-center border bg-transparent/5">
            header
          </div>
        ) : null}
        {frame.nav.render ? (
          <div className="flex h-12 items-center justify-center border bg-transparent/5">
            navbar
          </div>
        ) : null}

        <main className="flex flex-1 flex-row items-stretch gap-x-4">
          {frame.aside.render ? (
            <div className="flex w-80 items-center justify-center border bg-transparent/5">
              aside
            </div>
          ) : null}

          <div className="flex flex-1 flex-col gap-y-4">
            {Object.keys(frame.main).map((section) =>
              frame.main[section].render ? (
                <div
                  key={section}
                  className="flex w-full flex-1 items-center justify-center border bg-transparent/5"
                >
                  {section}
                </div>
              ) : null,
            )}
          </div>
        </main>

        {frame.footer.render ? (
          <div className="flex h-16 items-center justify-center border bg-transparent/5">
            footer
          </div>
        ) : null}
      </div>

      {isOver && (
        <div className="absolute left-0 top-0 z-10 h-full w-full bg-transparent/5" />
      )}
    </div>
  );
};
