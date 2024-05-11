import type { Meta, StoryObj } from "@storybook/react";
import TextInputField from "./index";

const meta: Meta<typeof TextInputField> = {
  title: "Atoms/TextField",
  component: TextInputField,
};

export default meta;

type Story = StoryObj<typeof TextInputField>;

export const TextInput: Story = {
  args: {
    placeholder: "john@example.com",
  },
};
