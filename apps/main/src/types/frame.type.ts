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
  className: string;
  title: string;
  children: Frame[];
};

export type FrameElement = {
  display: string;
  tag: string;
  className: string;
};
