import { Meta, StoryFn } from "@storybook/react";
import NotificationCard from ".";
import { NOTIFICATION_DATA } from "../../../utils/constants";

export default {
  title: "organisms/NotificationCard",
  component: NotificationCard,
} as Meta<typeof NotificationCard>;

const Template: StoryFn<typeof NotificationCard> = (args) => (
  <NotificationCard {...args} />
);
export const NotificationList = Template.bind({});
NotificationList.args = {
  notificationData: NOTIFICATION_DATA,
  handleCloseIcon: () => {},
  visible: true,
};
