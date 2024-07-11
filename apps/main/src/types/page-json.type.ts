export type ValidAttribute = keyof HTMLElement;

export type PageJson = {
  tag: keyof HTMLElementTagNameMap;
  attributes: keyof ValidAttribute[];
  children: PageJson[];
};
