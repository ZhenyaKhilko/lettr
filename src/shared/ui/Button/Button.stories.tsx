import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./index";

const meta = {
  title: "Shared/UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "ghostInline", "icon"],
    },
    size: {
      control: "select",
      options: ["md", "lg"],
    },
    disabled: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
    size: "md",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Button",
    size: "md",
  },
};

export const GhostInline: Story = {
  args: {
    variant: "ghostInline",
    children: "Ghost Inline Button",
    size: "md",
  },
};

export const Loading: Story = {
  args: {
    variant: "primary",
    children: "Generate",
    loading: true,
  },
};

export const IconLeft: Story = {
  args: {
    variant: "primary",
    children: "Create New",
    iconPosition: "left",
    icon: <img src="/assets/icon-plus.svg" alt="" />,
  },
};

export const IconButton: Story = {
  args: {
    variant: "icon",
    "aria-label": "Home",
    icon: <img src="/assets/icon-home.svg" alt="" />,
  },
};
