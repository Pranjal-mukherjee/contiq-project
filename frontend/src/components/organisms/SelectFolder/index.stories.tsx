import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import SelectFileSelection, { SelectFolderProps } from "./index";

export default {
  title: "organisms/SelectFileSelection",
  component: SelectFileSelection,
} as Meta;

const Template: StoryFn<SelectFolderProps> = (args) => (
  <SelectFileSelection {...args} />
);

export const FoldersAndFilesSelect = Template.bind({});
FoldersAndFilesSelect.args = {
  folderData: [
    {id:'1', name: "Zemoso Decks" },
    {id:'2', name: "Sample Data(1)" },
    {id:'3', name: "Sample Data(2)" },
  ],
  fileData: [{id:'1', name: "company", parents:['2'] }],
  callBackFromParent: () => {},
};
