import type { Meta, StoryObj } from '@storybook/react';
import Filter from '.';
import {
  FILE_ITEM1,
  FILE_ITEM2,
  FILE_ITEM3,
  FILE_TYPE,
  PUBLISH_ITEM1,
  PUBLISH_ITEM2,
  PUBLISH_ITEM3,
  PUBLISH_LABEL,
  PUBLISH_PLACEHOLDER
} from '../../../utils/constants';

const meta = {
  title: 'organisms/Filter',
  component: Filter
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FileType: Story = {
  args: {
    placeholder: FILE_TYPE,
    label: FILE_TYPE,
    menuItems: [
       FILE_ITEM1,
       FILE_ITEM2,
       FILE_ITEM3
    ]
  }
};
export const PublishSetting: Story = {
  args: {
    placeholder: PUBLISH_PLACEHOLDER,
    label: PUBLISH_LABEL,
    menuItems: [
       PUBLISH_ITEM1,
       PUBLISH_ITEM2,
       PUBLISH_ITEM3
    ]
  }
};
