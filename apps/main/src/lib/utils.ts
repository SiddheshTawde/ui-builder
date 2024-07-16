import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export * from "./frame-manipulation";
export * from "./render-element";
export * from "./render-html";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateUUID() {
  // Generate a random number in the form of a hexadecimal string
  function randomHexDigit() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  // Create a UUID from the random hexadecimal strings
  return (
    randomHexDigit() +
    randomHexDigit() +
    "-" +
    randomHexDigit() +
    "-" +
    "4" +
    randomHexDigit().substr(0, 3) + // UUID version 4
    "-" +
    [8, 9, "a", "b"][Math.floor(Math.random() * 4)] +
    randomHexDigit().substr(0, 3) + // UUID variant 1
    "-" +
    randomHexDigit() +
    randomHexDigit() +
    randomHexDigit()
  );
}
