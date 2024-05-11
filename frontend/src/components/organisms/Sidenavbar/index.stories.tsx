import { Meta, StoryFn } from '@storybook/react';
import Sidenavbar from '.';


export default {
  title: 'Organisms/SideNavbar',
  component: Sidenavbar
} as Meta<typeof Sidenavbar>;

const Template: StoryFn<typeof Sidenavbar> = (args) => <Sidenavbar {...args} />;
export const NavBar = Template.bind({});
  NavBar.args = {
  }