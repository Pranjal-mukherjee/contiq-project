import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import IconWithButton from '.';
import { BUTTON_TEXT } from '../../../utils/constants';

describe('Testing IconWithButton component', () => {
  test('renders IconWithButton with correct props', () => {
    render(<IconWithButton text={BUTTON_TEXT[0]} />);

    const textElement = screen.getByText(BUTTON_TEXT[0]);
    const Alttext = screen.getByAltText('no');

    expect(textElement).toBeInTheDocument();
    expect(Alttext).toBeInTheDocument();
  });

  test('calls the provided handleClick function when the button is clicked', () => {
    const handleClick = jest.fn();
    render(
      <IconWithButton
        handleClick={handleClick}
        text={BUTTON_TEXT[0]}
      />
    );

    fireEvent.click(screen.getByText(BUTTON_TEXT[0]));

    expect(handleClick).toHaveBeenCalled();
  });
});
