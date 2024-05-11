import type { Meta, StoryObj } from "@storybook/react";
import Avatar from "../../../../public/assets/icons/avatar.svg";

import HeaderBar from "./index";

const meta: Meta<typeof HeaderBar> = {
  title: "Organisms/HeaderBar",
  component: HeaderBar,
};

export default meta;

type Story = StoryObj<typeof HeaderBar>;

export const AppHeader: Story = {
  args: {
    userName: "John Ross",
    userId: "IDJR00292",
  },
};
