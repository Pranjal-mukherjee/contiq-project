import { Meta, StoryFn } from '@storybook/react';
import DriveFolder from '.';
import React from 'react';

export default {
  title: 'Molecules/DriveFolder',
  component: DriveFolder,
} as Meta<typeof DriveFolder>;
const Template: StoryFn<typeof DriveFolder> = (args) => <DriveFolder {...args}/>;
export const Folder = Template.bind({});
Folder.args = {
    name:"Zemoso Decks",
    isFile:false,

};
export const File = Template.bind({});
File.args = {
    name:"Company Agreement",
    isFile:true,
    onChangeFiles:()=>{}
};
