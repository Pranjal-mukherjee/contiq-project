import { Meta, StoryFn } from '@storybook/react';
import CopyPopup from '.';
import React from 'react';

export default {
  title: 'Molecules/CopyPopup',
  component: CopyPopup,
} as Meta<typeof CopyPopup>;
const Template: StoryFn<typeof CopyPopup> = () => <CopyPopup />;
export const CopyText = Template.bind({});

