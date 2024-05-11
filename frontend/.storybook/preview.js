import { StyledEngineProvider } from '@mui/styled-engine';
import { MemoryRouter } from 'react-router';
import { ThemeProvider } from '@mui/material/styles';
import './preview.css';
import theme from '../src/theme/index';
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};

export const decorators = [
  (Story) => (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={['/']}>
          <Story />
        </MemoryRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  )
];