import type { Meta, StoryObj } from "@storybook/react";
import ResetPassword from "./index";

const meta: Meta<typeof ResetPassword> = {
  title: "Organisms/ResetPassword",
  component: ResetPassword,
};

export default meta;

type Story = StoryObj<typeof ResetPassword>;

export const ResetPasswordwithEmail: Story = {
  args: {},
};
