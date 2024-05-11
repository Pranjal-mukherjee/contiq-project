import { Meta, StoryFn } from '@storybook/react';
import SyncProgress from '.';


export default {
  title: 'Molecules/Sync Progress',
  component: SyncProgress
} as Meta;

const Template: StoryFn<typeof SyncProgress> = (args) => <SyncProgress {...args} />;

export const SyncModal= Template.bind({});
SyncModal.args = {
    isDailogOpen:true,
    handleCloseClick:()=>{
        
    }
};

