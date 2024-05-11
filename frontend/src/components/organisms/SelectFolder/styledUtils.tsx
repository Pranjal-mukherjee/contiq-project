import { Box, styled } from '@mui/material';
import theme from '@src/theme';

export const CenteredContainer = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.structuralColor.overlay,
});

export const RootContainer = styled(Box)({
  width: '730px',
  height: '598px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  background: theme.palette.grays.gray400,
});

export const HeaderContainer = styled(Box)({
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '30px 31px 28px 20px',
  borderBottom: `1px solid ${theme.palette.grays.gray300}`,
  position: 'relative',
});

export const HeaderBox = styled(Box)({
  display: 'flex',
  gap: '12px',
});

export const ButtonGroup = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
});

export const RadioContainer = styled(Box)({
  padding: '7px 40px 1px 22px',
});

export const MainContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '400px',
});

export const ButtonContainer = styled('div')({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
  flexDirection: 'row',
  gap: '12px',
  padding: '45px 45px 40px 0px',

  marginLeft: 550,
});

export const Scrollbar = styled(Box)({
  overflowY: 'scroll',
  maxHeight: '444px',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    width: '0.4em',
    height: '0.4em',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.grays.gray400,
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
});
