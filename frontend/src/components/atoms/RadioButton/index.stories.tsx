import type { Meta, StoryObj } from '@storybook/react';
import RadioButton from '.';
import theme from '../../../theme';

const meta = {
  title: 'Atoms/RadioButton',
  component: RadioButton,
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Radio: Story = {
  args: {
    label: 'Sync Folders',
    checked: true,
    value: '1',
    onChange: () => {
      alert('Clicked on radio button');
    },
  },
};
