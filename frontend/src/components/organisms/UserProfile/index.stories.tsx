import type { Meta, StoryObj } from "@storybook/react";
import Avatar from "../../../../public/assets/icons/avatar.svg";
import UserProfileDropdown from "./index";

const meta: Meta<typeof UserProfileDropdown> = {
  title: "Organisms/UserProfileDropdown",
  component: UserProfileDropdown,
};

export default meta;

type Story = StoryObj<typeof UserProfileDropdown>;

export const UserProfile: Story = {
  args: {
    userName: "John Ross",
    userId: "IDJR00292",
  },
};
