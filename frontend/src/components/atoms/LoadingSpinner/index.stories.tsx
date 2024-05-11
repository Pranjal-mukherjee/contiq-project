import type { Meta, StoryObj } from "@storybook/react";
import StyledCircularLoad from ".";

const meta = {
  title: "Atoms/StyledCircularLoad",
  component: StyledCircularLoad,
} satisfies Meta<typeof StyledCircularLoad>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CircularProgress: Story = {
  args: {
    loaderColor: "primary",
  },
};
