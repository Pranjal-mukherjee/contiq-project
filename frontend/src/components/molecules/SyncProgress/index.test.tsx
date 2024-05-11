import React from 'react';
import { render, screen } from '@testing-library/react';
import SyncProgress from '.';

describe('SyncProgress Component', () => {
  test('renders correctly', () => {
    render(<SyncProgress isDailogOpen={true} handleCloseClick={()=>{}} />);
    expect(screen.getByTestId('syncProgress')).toBeInTheDocument();
  });
});
