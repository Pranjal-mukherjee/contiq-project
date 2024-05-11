import ImageComponent from "@components/atoms/Image";
import SignIn from "@components/organisms/SignIn";
import SignUp from "@components/organisms/SignUp";
import type { Meta, StoryObj } from "@storybook/react";
import LoginImage from "../../../../public/assets/images/login.png";
import LoginTemplate from "./index";

const meta: Meta<typeof LoginTemplate> = {
  title: "Templates/LoginTemplate",
  component: LoginTemplate,
};

export default meta;

type Story = StoryObj<typeof LoginTemplate>;

export const SignUpTemplatePage: Story = {
  args: {
    leftPanel: (
      <ImageComponent imgSrc={LoginImage} width={"100%"} height={"100%"} />
    ),
    rightPanel: <SignUp />,
  },
};

export const SignInTemplatePage: Story = {
  args: {
    leftPanel: (
      <ImageComponent imgSrc={LoginImage} width={"100%"} height={"100%"} />
    ),
    rightPanel: <SignIn />,
  },
};
