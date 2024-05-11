import { Meta, StoryFn } from '@storybook/react';
import DuplicationModal from '.';

export default {
  title: 'Organisms/DuplicationModel',
  component: DuplicationModal,
} as Meta<typeof DuplicationModal>;

const Template: StoryFn<typeof DuplicationModal> = (args) => (
  <DuplicationModal {...args} />
);
export const DuplicateFileUpload = Template.bind({});
DuplicateFileUpload.args = {
  fileName: null,
  clickToCancel: () => {},
  clickToUpload: () => {},
};
