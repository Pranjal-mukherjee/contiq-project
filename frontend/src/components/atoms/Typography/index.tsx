import React from 'react';
import { Typography, TypographyProps } from '@mui/material';

interface CustomTypographyProps extends TypographyProps {}

const CustomTypography: React.FC<CustomTypographyProps> = (
  props: CustomTypographyProps
) => {
  return <Typography {...props}>{props.children}</Typography>;
};

export default CustomTypography;
