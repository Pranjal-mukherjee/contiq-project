import { Meta, StoryFn } from "@storybook/react";
import PDFViewer from ".";

export default {
  title: "Organisms/PDFViewer",
  component: PDFViewer,
} as Meta<typeof PDFViewer>;

const Template: StoryFn<typeof PDFViewer> = (args) => <PDFViewer {...args} />;
export const Default = Template.bind({});
Default.args = {
  fileName: "Company agreement.pdf",
  onNavBack: () => {},
  filePath: "./files/PDFTRON_about.pdf",
  searchKey: "Repair business",
  searchContent: [
    "Since being established in 1908 as a sewing machine Repair business, the brother group has pursued the diversification and globalization of business in its history of more",
    "Repair business is",
    "Repair business is ss",
  ],
};
