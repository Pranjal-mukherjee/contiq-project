import type { Meta, StoryObj } from "@storybook/react";
import SingUp from "./index";

const meta: Meta<typeof SingUp> = {
  title: "Organisms/SingUp",
  component: SingUp,
};

export default meta;

type Story = StoryObj<typeof SingUp>;

export const SingUpWithEmail: Story = {
  args: {},
};
