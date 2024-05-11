import React from 'react';
import { render } from '@testing-library/react';
import CustomTypography from '.';

test('Test - HomeHeader', () => {
  const { container } = render(
    <CustomTypography variant="h3">CONTIQ</CustomTypography>
  );
  expect(container).toBeInTheDocument();
});
