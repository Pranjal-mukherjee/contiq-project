import React, { useState } from "react";
import { StoryFn, Meta } from "@storybook/react";
import theme from "../../../theme";
import MuiTabs, { MuiTabsProps } from ".";
import { FILE_TAB, UPLOAD_TAB } from "@src/utils/constants";

export default {
  title: "molecules/MuiTabs",
  component: MuiTabs,
} as Meta;

const Template: StoryFn<MuiTabsProps> = (args) => {
  const [selectIndex, setSelectIndex] = useState<number>(0);
  return (
    <MuiTabs
      {...args}
      handleChange={(event, newValue) => setSelectIndex(newValue)}
      selectIndex={selectIndex}
    />
  );
};

export const StandardVariant = Template.bind({});
StandardVariant.args = {
  variant: "standard",
  tabNames: FILE_TAB,
  selectedColor: theme.palette.primary.main,
  backgroundColor: theme.palette.text.white,
  notSelectedColor: theme.palette.text.mediumEmphasis,
  borderBottom: `1px solid ${theme.palette.grays.gray600}`,
  isTabDisabled: true,
  onSelectTab: () => {},
};

export const FullWidthVariant = Template.bind({});
FullWidthVariant.args = {
  variant: "fullWidth",
  tabNames: UPLOAD_TAB,
  selectedColor: theme.palette.text.white,
  backgroundColor: theme.palette.grays.gray400,
  notSelectedColor: theme.palette.text.mediumEmphasis,
  borderBottom: `2px solid ${theme.palette.grays.gray200}`,
  isTabDisabled: false,
  onSelectTab: () => {},
};
