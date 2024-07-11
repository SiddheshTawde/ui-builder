import { CSSProperties } from "react";

export type FrameTag =
  | "header"
  | "nav"
  | "aside"
  | "section"
  | "footer"
  | "main"
  | "div";

export type Frame = {
  id: string;
  tag: FrameTag;
  style: CSSProperties;
  title: string;
  children: Frame[];
};
