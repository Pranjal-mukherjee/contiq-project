import React from 'react';
import MuiButton from '@components/atoms/Button';
import AddIcon from '../../../../public/assets/icons/addIcon.svg';

export interface IconWithButtonProps {
  handleClick?: () => void;
  text: string;
}

const IconWithButton = ({
  text,
  handleClick,
}: IconWithButtonProps) => {
  return (
    <MuiButton
      startIcon={<img src={AddIcon} alt="no" />}
      text={text}
      variant={'contained'}
      onClick={handleClick}
    ></MuiButton>
  );
};

export default IconWithButton;
