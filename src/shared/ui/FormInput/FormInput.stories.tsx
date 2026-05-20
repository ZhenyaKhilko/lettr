import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FormInput } from "./index";

const meta = {
  title: "Shared/UI/FormInput",
  component: FormInput,
  tags: ["autodocs"],
  args: {
    label: "Job Title",
    placeholder: "e.g. Frontend Developer",
    maxLength: 200,
  },
  argTypes: {
    maxLength: {
      control: { type: "number", min: 1 },
    },
  },
} satisfies Meta<typeof FormInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return <FormInput {...args} id="input" value={value} onChange={(e) => setValue(e.target.value)} />;
  },
};
