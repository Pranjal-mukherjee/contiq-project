import type { Meta, StoryObj } from "@storybook/react";

import PDFPagination from "./index";

const meta: Meta<typeof PDFPagination> = {
  title: "Molecules/PDFPagination",
  component: PDFPagination,
};

export default meta;

type Story = StoryObj<typeof PDFPagination>;

export const Pagination: Story = {
  args: {
    percentage: 85,
    pageNumber: 1,
    totalPages: 5,
  },
};
