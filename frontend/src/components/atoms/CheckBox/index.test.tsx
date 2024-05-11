import React from 'react';
import { render } from '@testing-library/react';
import CheckboxComponent from '.';
import theme from '@src/theme';

test('renders checkbox with provided props', () => {
  const { getByTestId } = render(<CheckboxComponent disabled={false} testId="custom-checkbox" onChange={()=>{}}/>);

  const checkbox = getByTestId('custom-checkbox');

  expect(checkbox).toBeInTheDocument();
 
  expect(checkbox).not.toBeDisabled();
  expect(checkbox).toHaveStyle(`color:${theme.palette.text.white}`)
});
test('renders checkbox with enabled  props', () => {
  const { getByTestId } = render(<CheckboxComponent disabled={true} testId="custom-checkbox" onChange={()=>{}}/>);

  const checkbox = getByTestId('custom-checkbox');

  expect(checkbox).toBeInTheDocument();
  expect(checkbox).toHaveStyle(`color:${theme.palette.grays.gray100}`)
});
