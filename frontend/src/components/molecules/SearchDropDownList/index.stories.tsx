import { Meta, StoryFn } from '@storybook/react';
import SearchDropDownList from '.';
import { FILE_DATA } from '../../../utils/constants';

export default {
  title: 'Molecules/SearchDropDownList',
  component: SearchDropDownList,
} as Meta<typeof SearchDropDownList>;

const Template: StoryFn<typeof SearchDropDownList> = (args) => (
  <SearchDropDownList {...args} />
);
export const SearchPopup = Template.bind({});
SearchPopup.args = {
  data: FILE_DATA,
  onClick: () => {},
  visible:true
};
