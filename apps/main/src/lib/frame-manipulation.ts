import type { Frame, FrameTag } from "@root/types/frame.type";
import { remove } from "lodash";
import { generateUUID } from "./utils";

export function createFrame(tag: FrameTag, title: string = ""): Frame {
  return {
    id: generateUUID(),
    tag,
    title,
    children: [],
    style: {},
  };
}

export function findOrCreateMainFrame(frames: Frame[]): Frame {
  let mainFrame = frames.find((frame) => frame.tag === "main");
  if (!mainFrame) {
    mainFrame = createFrame("main");
    frames.push(mainFrame);
  }
  return mainFrame;
}

export function removeElementById(array: Frame[], id: string) {
  // Helper function to recursively traverse and remove object

  function traverseAndRemove(arr: Frame[]) {
    // Use lodash's remove function to remove objects with the given id
    remove(arr, (item) => item.id === id);

    // Iterate through the array to find nested arrays and apply the function recursively
    arr.forEach((item) => {
      if (item.children && Array.isArray(item.children)) {
        traverseAndRemove(item.children);
      }
    });
  }

  // Start the recursive traversal
  traverseAndRemove(array);

  return array;
}
