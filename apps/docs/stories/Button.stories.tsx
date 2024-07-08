import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@repo/ui-components";
import "@repo/ui-components/dist/index.css";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Elements/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["contained", "outlined", "link"],
      control: { type: "select" },
      type: "string",
    },
    disabled: {
      options: [true, false],
      control: { type: "radio" },
    },
    loading: {
      options: [true, false],
      control: { type: "radio" },
    },
  },
  args: {
    variant: "contained",
    children: null,
    disabled: false,
    loading: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Contained: Story = {
  args: {
    children: "Click Here",
    variant: "contained",
  },
};
export const Outlined: Story = {
  args: {
    children: "Click Here",
    variant: "outlined",
  },
};
export const Link: Story = {
  args: {
    children: "Click Here",
    variant: "link",
  },
};
