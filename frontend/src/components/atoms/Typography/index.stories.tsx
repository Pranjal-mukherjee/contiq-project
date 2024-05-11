import type { Meta, StoryObj } from '@storybook/react';
import CustomTypography from '.';
import theme from '../../../theme';

const meta = {
  title: 'Atoms/Typography',
  component: CustomTypography,
} satisfies Meta<typeof CustomTypography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Title: Story = {
  args: {
    variant: 'h3',
    children: 'CONTIQ',
    color: theme.palette.text.black,
  },
};
