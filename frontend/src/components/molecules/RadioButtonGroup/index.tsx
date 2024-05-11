import RadioButton from "@components/atoms/RadioButton";
import { Box, styled } from "@mui/material";
import { RADIO_BUTTON_GROUP } from "@src/utils/constants";
import React from "react";
export interface RadioButtons {
  id:number,
  label: string;
  isChecked: boolean;
};
const RadioBox = styled(Box)(({ theme }) => ({
  display: "flex",
}));

const RadioGroup = () => {
  return (
    <RadioBox data-testid="radio-btn-grp">
      {RADIO_BUTTON_GROUP.map((item: RadioButtons) => (
        <RadioButton
          label={item.label}
          checked={item.isChecked}
          key={item.id}
          value={item.label}
        />
      ))}
    </RadioBox>
  );
};

export default RadioGroup;
