import { Box, styled } from '@mui/material';
import theme from '@src/theme';

export const StyledBox = styled(Box)(() => ({
  width: '100%',
  height: '95%',
  overflowY: 'auto',
  overflowX: 'hidden',
  writingMode: 'vertical-lr',
  direction: 'ltr',
  padding: '10px',
}));

export const CustomPdfViewerStyles = `:root{ 

  --document-background-color: ${theme.palette.structuralColor.background1} ; 
  --panel-background: ${theme.palette.structuralColor.background1} ;
  --focus-border: ${theme.palette.primary.main} 
}
::-webkit-scrollbar-track { 
  background: ${theme.palette.grays.gray600};
  width: '14px'
  radius: '12px'
}
.Thumbnail .page-label {
  display:none
}
.LeftPanel .left-panel-header {
  margin: 0 !important;
}
.left-panel-container {
  width: 100%;
  padding: 0 !important;
}
.Thumbnail .page-image {
  height: 190px !important;
  width: 140px !important;
}
.document-content-container .measurement-container {
  width: 70%;
}`;

export const PaginationStyle = styled(Box)({
  position: 'fixed',
  bottom: '5%',
  left: '50%',
  width: '20%',
});
