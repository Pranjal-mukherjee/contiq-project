import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import FileUpload, { FileDropProps } from '.';
import { ChangeEvent, useState } from 'react';

export default {
  title: 'Molecules/FileDrop',
  component: FileUpload,
} satisfies Meta<typeof FileUpload>;

const Template: StoryFn<typeof FileUpload> = (...args) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <FileUpload
      selectedFile={selectedFile}
      handleFileChange={(e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setSelectedFile(file);
      }}
    />
  );
};

export const DropFile = Template.bind({});
DropFile.args = {};
