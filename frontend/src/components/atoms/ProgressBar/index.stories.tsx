import type { Meta, StoryObj } from "@storybook/react";
import LinearDeterminate from ".";

const meta = {
  title: "Atoms/LinearDeterminate",
  component: LinearDeterminate,
} satisfies Meta<typeof LinearDeterminate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LinearProgressBar: Story = {
  args: {},
};
