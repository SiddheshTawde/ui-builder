export type Tag = "header" | "nav" | "aside" | "section" | "footer";

export type Frame = {
  header?: {
    render: boolean;
  };
  nav?: {
    render: boolean;
  };
  aside?: {
    render: boolean;
  };
  main: Record<
    string,
    {
      render: boolean;
    }
  >;
  footer?: {
    render: boolean;
  };
};
