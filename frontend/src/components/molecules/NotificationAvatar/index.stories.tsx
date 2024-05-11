import type { Meta, StoryObj } from "@storybook/react";


import Notification from "./index";

const meta: Meta<typeof Notification> = {
  title: "Molecules/Notification",
  component: Notification,
};

export default meta;

type Story = StoryObj<typeof Notification>;

export const NotificationAvatar: Story = {
  args: {

    message: "Amit has uploaded company agreement.pdf",
    timestamp: "20  June  10:30 AM",
  
  },
};
