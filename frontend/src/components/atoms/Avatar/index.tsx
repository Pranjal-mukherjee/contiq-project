import React from 'react';
import { Avatar, AvatarProps } from '@mui/material';

interface CustomAvatarProps extends AvatarProps {}

const CustomAvatar: React.FC<CustomAvatarProps> = (
  props: CustomAvatarProps
) => {
  return <Avatar {...props}>{props.children}</Avatar>;
};

export default CustomAvatar;
