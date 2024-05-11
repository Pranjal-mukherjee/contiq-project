import { Meta, StoryFn } from "@storybook/react";
import UploadFiles from ".";

export default {
  title: "Organisms/UploadFiles",
  component: UploadFiles,
} as Meta<typeof UploadFiles>;

const Template: StoryFn<typeof UploadFiles> = (args) => (
  <UploadFiles {...args} />
);
export const UploadAndSyncFiles = Template.bind({});
UploadAndSyncFiles.args = {};
