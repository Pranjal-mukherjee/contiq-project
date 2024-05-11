import  { StoryFn, Meta } from '@storybook/react';
import DatePicker from '.';
import { START_DATE } from '../../../utils/constants';
import React, { useState } from 'react';

export default {
  title: 'organisms/DatePicker',
  component: DatePicker
} as Meta;


export const Template: StoryFn<typeof DatePicker> = (args) => {
  const [date, setDate] = useState<string>('');
  return <DatePicker {...args} date={date} setDate={setDate} />;
};
Template.args = {
  label: START_DATE
};
