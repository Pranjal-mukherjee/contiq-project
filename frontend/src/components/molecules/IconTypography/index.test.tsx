import React from 'react';
import { render, screen } from '@testing-library/react';
import IconWithTypography from '.';
import HomeIcon from '../../../../public/assets/icons/Home.svg';
import { SIDE_BAR_LABELS } from '../../../utils/constants';

describe('Testing IconWithTypography component', () => {
  test('renders IconWithTypography with correct props', () => {
    const iconSrc = HomeIcon;
    const text = SIDE_BAR_LABELS[0];
    render(<IconWithTypography iconSrc={iconSrc} text={text} />);

    const textElement = screen.getByText(SIDE_BAR_LABELS[0]);
    const rootBoxElement = screen.getByTestId('presentation-card');

    expect(textElement).toBeInTheDocument();
    expect(rootBoxElement).toBeInTheDocument();
  });
});
