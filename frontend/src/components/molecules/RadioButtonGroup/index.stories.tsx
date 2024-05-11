import { Meta, StoryFn } from '@storybook/react';
import RadioGroup from '.';
import React from 'react';

export default {
  title: 'Molecules/RadioGroup',
  component: RadioGroup,
} as Meta<typeof RadioGroup>;
const Template: StoryFn<typeof RadioGroup> = () => <RadioGroup />;
export const RadioWithText = Template.bind({});
RadioWithText.args = {};
