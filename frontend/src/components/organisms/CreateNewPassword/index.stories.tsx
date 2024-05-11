import {
  CONFIRM_NEW_PASSWORD,
  CREATE_NEW_PWD_PLACEHOLDER,
  NEW_PASSWORD,
  NEW_PWD_HEADING,
  NEW_PWD_MESSAGE,
} from "@src/utils/constants";
import type { Meta, StoryObj } from "@storybook/react";
import CreateNewPassword from "./index";

const meta: Meta<typeof CreateNewPassword> = {
  title: "Organisms/CreateNewPassword",
  component: CreateNewPassword,
};

export default meta;

type Story = StoryObj<typeof CreateNewPassword>;

export const NewPassword: Story = {
  args: {
    placeHolderText: CREATE_NEW_PWD_PLACEHOLDER,
    newPwdLabel: NEW_PASSWORD,
    confirmPwdlabel: CONFIRM_NEW_PASSWORD,
    createPwdHeading: NEW_PWD_HEADING,
    message: NEW_PWD_MESSAGE,
  },
};
