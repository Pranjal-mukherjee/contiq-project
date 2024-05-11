import { EMAIL_ID } from "@src/utils/constants";
import type { Meta, StoryObj } from "@storybook/react";
import InputFieldTypography from "./index";

const meta: Meta<typeof InputFieldTypography> = {
  title: "Molecules/InputFieldTypography",
  component: InputFieldTypography,
};

export default meta;

type Story = StoryObj<typeof InputFieldTypography>;

export const InputFieldWithLabel: Story = {
  args: {
    label: EMAIL_ID,
    placeHolder: "john@example.com",
  },
};
