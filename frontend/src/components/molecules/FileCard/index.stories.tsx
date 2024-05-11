import type { Meta, StoryObj } from "@storybook/react";
import FileIcon from "../../../../public/assets/icons/FileIcon.svg";
import Thumbnail from "../../../../public/assets/images/Thumbnail.svg";

import FileCard from "./index";

const meta: Meta<typeof FileCard> = {
  title: "Molecules/FileCard",
  component: FileCard,
};

export default meta;

type Story = StoryObj<typeof FileCard>;

export const FileThumbnailCard: Story = {
  args: {
    fileName: "Company Profile.pdf",
  },
};
