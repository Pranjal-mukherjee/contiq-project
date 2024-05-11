import { Meta, StoryFn } from "@storybook/react";
import CheckboxComponent, { CheckboxCustomProps } from ".";

export default {
  title: "Atoms/Checkbox",
  component: CheckboxComponent,
} as Meta;

const Template: StoryFn<CheckboxCustomProps> = (args) => (
  <CheckboxComponent {...args} />
);

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Enabled = Template.bind({});
Enabled.args = {
  disabled: false,
  onChange: () => {},
};
