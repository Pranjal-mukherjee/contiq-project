import React from 'react';
import { Checkbox, SxProps, CheckboxProps, FormControlLabel, styled } from '@mui/material';
import theme from '../../../theme';
import { checkboxClasses } from '@mui/material/Checkbox';
import { CheckBoxOutlineBlankOutlined, CheckBoxOutlined } from '@mui/icons-material';


export interface CheckboxCustomProps extends CheckboxProps {
  sx?: SxProps;
  label?: string;
  onChange: (event: React.ChangeEvent) => void;
  disabled: boolean;
  testId?: any;
  isChecked?:boolean;
}

const CheckboxComponent: React.FC<CheckboxCustomProps> = ({
  sx,
  label,
  onChange,
  disabled,
  testId,
  isChecked
}) => {

  const CustomCheckbox = styled(Checkbox)({
    [`&.${checkboxClasses.colorPrimary}`]: {
      color: disabled ? theme.palette.grays.gray100 : theme.palette.text.white
    }
  });
  return (
    <FormControlLabel
      control={
        <CustomCheckbox
          icon={<CheckBoxOutlineBlankOutlined />}
          checkedIcon={<CheckBoxOutlined />}
          disableRipple
          onChange={onChange}
          sx={sx}
          disabled={disabled}
          data-testid={testId}
          checked={isChecked}
        />
      }
      label={label}
    />
  );
};

export default CheckboxComponent;
