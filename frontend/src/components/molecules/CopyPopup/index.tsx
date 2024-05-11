import React, { useState } from 'react';
import IconComponent from '@components/atoms/Icon';
import CustomTypography from '@components/atoms/Typography';
import { Card, styled } from '@mui/material';
import theme from '../../../theme';
import CloseIcon from '../../../../public/assets/icons/closeIcon.svg';
import CompleteIcon from '../../../../public/assets/icons/complete.svg';
import { COPY_POPUP_TEXT } from '@src/utils/constants';

const RootBox = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  height: '40px',
  width: '200px',
  background: theme.palette.grays?.gray400,
  borderRadius: '4px',
  padding: '4px 8px 4px 8px',
  gap: '12px',
  marginLeft: '1134px',
  marginTop: '17px',
}));

const CopyPopup = () => {
  const [cardVisible, setCardVisible] = useState(true);
  const handleClose = () => {
    setCardVisible(false);
  };

  return (
    <div>
      {cardVisible ? (
        <RootBox data-testid="toast">
          <div style={{ marginLeft: 2 }}>
            <IconComponent
              src={CompleteIcon}
              data-testid="complete-icon"
            />
          </div>
          <div style={{ marginLeft: 4 }}>
            <CustomTypography
              variant="body1"
              color={theme.palette.text.white}
            >
              {COPY_POPUP_TEXT}
            </CustomTypography>
          </div>
          <div style={{ marginLeft: 36 }}>
            <IconComponent
              src={CloseIcon}
              onclick={handleClose}
              data-testid="close-icon"
            />
          </div>
        </RootBox>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default CopyPopup;
