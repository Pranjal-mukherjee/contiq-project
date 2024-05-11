import React from 'react';
import { render } from '@testing-library/react';
import CustomAvatar from '.';
import avatar from '../../../../public/assets/icons/avatar.svg';

test('Test - HomeHeader', () => {
  const { container } = render(
    <CustomAvatar
      variant="circular"
      src={avatar}
      sx={{ width: 36, height: 36 }}
    ></CustomAvatar>
  );
  expect(container).toBeInTheDocument();
});
