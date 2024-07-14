import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "@repo/ui-components";
import "@repo/ui-components/dist/index.css";
import "./index.css";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Elements/Input",
  component: Input,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      options: [true, false],
      control: { type: "radio" },
    },
    loading: {
      options: [true, false],
      control: { type: "radio" },
    },
    label: {
      type: "string",
    },
    error: {
      type: "string",
    },
    type: {
      options: ["text", "email", "password", "number", "url", "search"],
      control: { type: "select" },
    },
  },
  args: {
    disabled: false,
    loading: false,
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    placeholder: "@username",
  },
};

export const Email: Story = {
  args: {
    label: "Company Email Address",
    placeholder: "example.user@company.com",
    type: "email",
    error: "Could not find the user",
    value: "siddheshtawde35@gmail.com",
  },
};

export const Password: Story = {
  args: {
    label: "Password",
    placeholder: "Secure password",
    type: "password",
  },
};
