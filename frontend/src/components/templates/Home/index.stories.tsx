import type { Meta, StoryFn } from '@storybook/react';
import HomeTemplate from '.';
import SideBar from '@components/organisms/Sidenavbar';
import HeaderBar from '@components/organisms/Header';
import { Box } from '@mui/material';
import Avatar from '../../../../public/assets/icons/avatar.svg';

export default {
  title: 'Templates/Home',
  component: HomeTemplate,
} as Meta<typeof HomeTemplate>;

const Template: StoryFn<typeof HomeTemplate> = (args) => (
  <HomeTemplate {...args} />
);
export const Home = Template.bind({});
Home.args = {
  header: (
    <HeaderBar
      userName={'Avatar'}
      userId={'1'}
    />
  ),
  sidebar: <SideBar />,
  mainContent: <Box></Box>,
};
