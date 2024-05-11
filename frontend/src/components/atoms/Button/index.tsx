import { Box, Button, SxProps, styled } from '@mui/material';
import React from 'react';
import theme from '../../../theme';

interface IMuiButtonProps {
  text: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  startIcon?: React.ReactNode;
  sx?: SxProps;
  variant: 'contained' | 'outlined' | 'text';
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  testId?: string;
}

const StyledButton = styled(Button)(({ disabled }) => ({
  '&.MuiButton-root': {
    textTransform: 'none',
    borderRadius: '4px',
    color: theme.palette.text.white,
    boxShadow: 'none',
    ':disabled': {
      backgroundColor: theme.palette.primary.light,
    },
    '&:hover': {
      backgroundColor: `${theme.palette.primary.main}`,
    },
  },
  '& .MuiButton-startIcon svg, .MuiButton-endIcon svg': {
    display: 'flex',
    placeContent: 'center',
  },
}));

const MuiButton = ({ text, testId, ...props }: IMuiButtonProps) => {
  return (
    <Box>
      <StyledButton {...props} data-testid={testId}>
        {text}
      </StyledButton>
    </Box>
  );
};

export default MuiButton;
