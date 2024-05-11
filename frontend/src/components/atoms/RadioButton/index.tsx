import React, { ChangeEvent } from 'react';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import CustomTypography from '../Typography';
import theme from '@src/theme';

interface IRadioButtonProps {
  label: string;
  value: string;
  checked: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton: React.FC<IRadioButtonProps> = (
  props: IRadioButtonProps
) => {
  const mainColor = props.checked
    ? theme.palette.text.white
    : theme.palette.text.highEmphasis;

  return (
    <FormControlLabel
      control={
        <Radio
          data-testid={`radio-${props.value}`}
          checked={props.checked}
          onChange={props.onChange}
          value={props.value}
          style={{ color: mainColor }}
        />
      }
      label={
        <CustomTypography variant="body1" color={mainColor}>
          {props.label}
        </CustomTypography>
      }
    />
  );
};

export default RadioButton;
