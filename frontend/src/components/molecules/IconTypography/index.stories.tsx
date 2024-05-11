import { Meta, StoryFn } from '@storybook/react';
import IconWithTypography, { IconWithTypographyProps } from '.';
import { SIDE_BAR_LABELS } from '../../../utils/constants';
import HomeIcon from '../../../../public/assets/icons/Home.svg';
import CalenderIcon from '../../../../public/assets/icons/calender.svg';
import theme from '../../../theme';


export default {
  title: 'Molecules/IconWithTypography',
  component: IconWithTypography
} as Meta;

const Template: StoryFn<IconWithTypographyProps> = (args) => <IconWithTypography {...args} />;

export const Home = Template.bind({});
Home.args = {
  iconSrc: HomeIcon,
  text: SIDE_BAR_LABELS[0],
  textColor: theme.palette.grays.gray200
};

export const File = Template.bind({});
File.args = {
  iconSrc: CalenderIcon,
  text: SIDE_BAR_LABELS[3],
  textColor: theme.palette.grays.gray200
};
