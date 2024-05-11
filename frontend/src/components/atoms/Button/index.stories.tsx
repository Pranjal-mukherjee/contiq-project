import type { Meta, StoryObj } from '@storybook/react';
import AddIcon from '../../../../public/assets/icons/addIcon.svg';
import MuiButton from '.';
import theme from '@src/theme';

const meta = {
  title: 'atoms/Button',
  component: MuiButton
} satisfies Meta<typeof MuiButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const ButtonProperties={
    backgroundColor: theme.palette.primary.main,
}

export const Primary: Story = {
  args: {
    text: 'Add files',
    variant: 'contained',
    sx: { ...ButtonProperties, }
  }
};

export const ButtonWithStartIcon: Story = {
  args: {
    text: 'Add files',
    startIcon: <img src={AddIcon} alt='no' />,
    variant: 'contained',
    sx: { ...ButtonProperties, }
  }
};

export const SignInButton: Story = {
  args: {
    text: 'Sign in',
    variant: 'contained',
    sx: { ...ButtonProperties, width: '300px', height: '48px' }
  }
};

export const DisabledButton: Story = {
  args: {
    text: 'Sign in',
    variant: 'contained',
    sx: {...ButtonProperties, width: '350px', height: '50px', color: theme.palette.text.white },
    disabled: true
  }
};
