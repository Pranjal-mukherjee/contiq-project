import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import CloudStorage from '.';

export default {
  title: 'organisms/CloudStorage',
  component: CloudStorage
} as Meta;

const Template: StoryFn = (args) => <CloudStorage {...args} />;

export const Cloud = Template.bind({});
Cloud.args = {};
