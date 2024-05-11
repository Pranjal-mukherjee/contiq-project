import type { Meta, StoryObj } from '@storybook/react';
import CustomAvatar from '.';
import avatar from '../../../../public/assets/icons/avatar.svg';

const meta = {
  title: 'Atoms/Avatar',
  component: CustomAvatar,
} satisfies Meta<typeof CustomAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Profile: Story = {
  args: {
    variant: 'circular',
    src: avatar,
    sx: { width: 36, height: 36 },
  },
};
