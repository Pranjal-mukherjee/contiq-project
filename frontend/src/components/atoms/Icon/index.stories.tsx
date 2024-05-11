import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import IconComponent, { IconComponentProps } from ".";

import Home from "../../../../public/assets/icons/Home.svg";
import Calender from "../../../../public/assets/icons/calender.svg";

export default {
  title: "atoms/IconComponent",
  component: IconComponent,
} as Meta;

const Template: StoryFn<IconComponentProps> = (args) => <IconComponent {...args} />;

export const HomeIcon = Template.bind({});
HomeIcon.args = {
  height: "20.02px",
  width: "18px",
  padding: "10px",
  src: Home,
};

export const CalenderIcon = Template.bind({});
CalenderIcon.args = {
  height: "20px",
  width: "20px",
  src: Calender,
};
