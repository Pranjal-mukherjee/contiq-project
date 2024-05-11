import React from 'react';
import { Box, Stack } from '@mui/material';

interface HomeTemplateProps {
  header: React.ReactNode;
  sidebar: React.ReactNode;
  mainContent: React.ReactNode;
}

const HomeTemplate = ({
  header,
  sidebar,
  mainContent,
}: HomeTemplateProps) => {
  return (
    <Box
      data-testid="homeTemplate"
      sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        overflowX: 'hidden'
      }}>
      <Stack direction={'column'} sx={{ width: '100%', height: '100%' }}>
        <Box sx={{ width: '100%', height: '7.5%' }}>{header}</Box>
        <Stack direction={'row'} sx={{ width: '100%', height: '92.11%' }}>
          <Box sx={{ minWidth: '82px', height: '100%' }}>{sidebar}</Box>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              overflowY: 'scroll',
              scrollBehavior: 'smooth',
              '::-webkit-scrollbar': {
                display: 'none'
              }
            }}>
            {mainContent}
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default HomeTemplate;
