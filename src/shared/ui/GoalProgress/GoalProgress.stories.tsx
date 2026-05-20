import type { Meta, StoryObj } from "@storybook/react";
import { GoalProgress } from "./index";

const meta = {
  title: "Shared/UI/GoalProgress",
  component: GoalProgress,
  tags: ["autodocs"],
  args: {
    total: 5,
  },
} satisfies Meta<typeof GoalProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Zero: Story = {
  args: {
    current: 0,
  },
};

export const Partial: Story = {
  args: {
    current: 3,
  },
};

export const Complete: Story = {
  args: {
    current: 5,
  },
};
