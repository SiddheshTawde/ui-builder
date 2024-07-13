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
  id?: string;
  tag: string;
  display: string;
  className: string;
};
