import { Meta, StoryFn } from "@storybook/react";
import ProgressBarModal, { ProgressBarModalProps } from ".";

export default {
  title: "Molecules/ProgressBarModal",
  component: ProgressBarModal,
} as Meta;

const Template: StoryFn<ProgressBarModalProps> = (args) => (
  <ProgressBarModal {...args} />
);

export const ProgressModal = Template.bind({});
ProgressModal.args = {
  fileName: null,
  onClose: () => {},
  open: true,
};
