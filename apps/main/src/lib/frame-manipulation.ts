import type { Frame, FrameTag } from "@root/types/frame.type";
import { remove } from "lodash";
import { generateUUID } from "./utils";

export function createFrameElement(
  tag: string,
  display: string,
  className: string,
): Frame {
  return {
    id: generateUUID(),
    tag: tag as FrameTag,
    title: display,
    children: [],
    className,
  };
}

export function findNodeById(
  array: Frame[],
  target_id: string,
): Frame | undefined {
  var o;
  array.some(function iter(a) {
    if (a.id === target_id) {
      o = a;
      return true;
    }
    return Array.isArray(a.children) && a.children.some(iter);
  });
  return o;
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
