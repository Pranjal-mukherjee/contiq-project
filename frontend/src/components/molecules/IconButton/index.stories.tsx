import { Meta, StoryObj } from '@storybook/react';
import IconWithButton from '.';
import { BUTTON_TEXT } from '../../../utils/constants';

const meta = {
  title: 'Molecules/IconWithButton',
  component: IconWithButton,
} as Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const IconButton: Story = {
  args: {
    text: BUTTON_TEXT[0],
  },
};
