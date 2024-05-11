import React from 'react';
import IconComponent from '../../atoms/Icon';
import TypographyComponent from '../../atoms/Typography';
import { Box, styled } from '@mui/material';

export interface IconWithTypographyProps {
  iconSrc: string;
  text: string;
  textColor?: string;
  onclick?: () => void;
}

const RootBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: theme.spacing(19),
  width: theme.spacing(20.5)
}));

const IconWithTypography = ({ iconSrc, text, textColor, onclick }: IconWithTypographyProps) => {
  return (
    <RootBox data-testid="presentation-card" onClick={onclick}>
      <IconComponent src={iconSrc} />
      <TypographyComponent variant="caption1" color={textColor}>
        {text}
      </TypographyComponent>
    </RootBox>
  );
};

export default IconWithTypography;
