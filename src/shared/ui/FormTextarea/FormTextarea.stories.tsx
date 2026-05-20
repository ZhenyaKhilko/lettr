import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FormTextarea } from "./index";

const meta = {
  title: "Shared/UI/FormTextarea",
  component: FormTextarea,
  tags: ["autodocs"],
  args: {
    label: "Additional Details",
    placeholder: "Describe your skills...",
  },
  argTypes: {
    error: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof FormTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return <FormTextarea {...args} id="textarea" value={value} onChange={(e) => setValue(e.target.value)} />;
  },
};

export const WithError: Story = {
  args: {
    error: true,
  },
  render: (args) => {
    const [value, setValue] = useState("This text is too long...");
    return <FormTextarea {...args} id="textarea" value={value} onChange={(e) => setValue(e.target.value)} />;
  },
};
