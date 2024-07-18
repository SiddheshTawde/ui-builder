import { Frame } from "@root/types/frame.type";
import { cn } from "./utils";

export default function RenderFrame(node: Frame) {
  return (
    <node.tag
      className={cn(
        "flex-1 rounded border",
        {
          "flex flex-col":
            node.title === "Main" ||
            node.title === "Row" ||
            node.title === "Column",
        },
        { "max-h-16": node.title === "Header" || node.title === "Footer" },
        { "max-h-12": node.title === "Nav" },
      )}
    >
      <p className="text-sm font-medium">{node.title}</p>

      <div
        className={cn("p-2", [node.className], {
          "flex-1": node.title === "Row" || node.title === "Column",
        })}
      >
        {node.children.map((n) => RenderFrame(n))}
      </div>
    </node.tag>
  );
}
