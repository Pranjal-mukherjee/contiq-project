import type { Meta, StoryObj } from "@storybook/react";
import SugnIn from "./index";

const meta: Meta<typeof SugnIn> = {
  title: "Organisms/SignIn",
  component: SugnIn,
};

export default meta;

type Story = StoryObj<typeof SugnIn>;

export const SingInWithEmail: Story = {
  args: {},
};
