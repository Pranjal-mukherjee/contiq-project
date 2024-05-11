import type { Meta, StoryObj } from "@storybook/react";
import BgImageLogin from "../../../../public/assets/images/BgImageLogin.svg";

import ImageComponent from "./index";

const meta: Meta<typeof ImageComponent> = {
  title: "Atoms/ImageComponent",
  component: ImageComponent,
};

export default meta;

type Story = StoryObj<typeof ImageComponent>;

export const Image: Story = {
  args: {
    imgSrc: BgImageLogin,
    imgAlt: "LoginBgImage.png",
  },
};
