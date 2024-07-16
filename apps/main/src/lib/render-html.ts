import { PageJson } from "@root/types/page-json.type";

export function renderHTML(nodes: PageJson[], parent: HTMLElement) {
  nodes.forEach((node) => {
    const element = document.createElement(node.tag);

    Object.entries(node.attributes).forEach(([attribute, value]) => {
      (element as any)[attribute] = value;
    });

    renderHTML(node.children, element);

    parent.appendChild(element);
  });
}
