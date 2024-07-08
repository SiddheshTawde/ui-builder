"use client";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@root/components/ui/button";
import { FRAME_ELEMENTS } from "@root/constants/frame-elements";
import { useState } from "react";

export type Tag = "header" | "nav" | "aside" | "section" | "footer";

const skeleton = {
  header: {
    render: false,
  },
  nav: {
    render: false,
  },
  aside: {
    render: false,
  },
  main: {},
  footer: {
    render: false,
  },
};

export default function AddNewPage() {
  const [frame, updateFrame] = useState<any>({ ...skeleton });

  const handleElement = (tag: Tag, action: "add" | "remove") => {
    const updated = { ...frame };

    if (action === "add") {
      if (tag !== "section") {
        updated[tag] = { render: true };
      }

      if (tag === "section") {
        updated.main = {
          ...updated.main,
          ["section-" + (Object.keys(updated.main).length + 1)]: {
            render: true,
          },
        };
      }
    }

    if (action === "remove") {
      if (tag !== "section") {
        updated[tag] = { render: false };
      }

      if (tag === "section") {
        delete updated.main["section-" + Object.keys(updated.main).length];
      }
    }

    updateFrame(updated);
  };

  return (
    <main className="container mx-auto h-[calc(100vh-64px)] overflow-y-auto">
      <div className="flex h-full items-stretch">
        <div className="flex w-80 flex-col gap-y-4 p-4">
          {FRAME_ELEMENTS.map((element) => (
            <div
              draggable={true}
              key={element.tag}
              className="flex items-center justify-between border bg-transparent/5 px-4 py-2"
            >
              <span className="font-medium">{element.display}</span>

              <div className="flex gap-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleElement(element.tag as Tag, "remove")}
                >
                  <MinusIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleElement(element.tag as Tag, "add")}
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

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
      </div>
    </main>
  );
}
