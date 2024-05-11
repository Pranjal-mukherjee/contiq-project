import { Meta, StoryFn } from "@storybook/react";
import SearchPopup from ".";

export default {
  title: "Organisms/SearchPopup",
  component: SearchPopup,
} as Meta<typeof SearchPopup>;

const Template: StoryFn<typeof SearchPopup> = (args) => (
  <SearchPopup {...args} />
);
export const TextSearchPopup = Template.bind({});
TextSearchPopup.args = {
  searchKey: "Repair business",
  searchContent: [
    "Since being established in 1908 as a sewing machine Repair business, the brother group has pursued the diversification and globalization of business in its history of more",
    "Repair business is",
    "Repair business is ss",
  ],
  pdfName: "Company Agreement",
};
