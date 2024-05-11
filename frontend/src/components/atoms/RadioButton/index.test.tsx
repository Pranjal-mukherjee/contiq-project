import React from 'react';
import { render } from '@testing-library/react';
import RadioButton from '.';
import theme from '@src/theme';
import Color from 'color';

test('to test the Radio Button Component on checked true', () => {
  const { container, getByTestId } = render(
    <RadioButton
      checked={true}
      onChange={() => {}}
      value="1"
      label={'Sync Folders'}
    />
  );
  const radioInput = getByTestId('radio-1');

  const computedColor = window.getComputedStyle(radioInput).color;
  const expectedHexColor = Color(computedColor).hex();

  expect(expectedHexColor).toContain(theme.palette.text.white);
  expect(container).toBeInTheDocument();
});

test('to test the Radio Button Component on checked false', () => {
  const { container, getByTestId } = render(
    <RadioButton
      checked={false}
      onChange={() => {}}
      value="1"
      label={'Sync Folders'}
    />
  );
  const radioInput = getByTestId('radio-1');

  const computedColor = window.getComputedStyle(radioInput).color;
  const expectedHexColor = Color(computedColor).hex();

  expect(expectedHexColor).toContain(theme.palette.text.highEmphasis);

  expect(container).toBeInTheDocument();
});
