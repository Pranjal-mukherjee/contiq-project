import InputField from "@components/atoms/InputField";
import { Box, InputProps, Typography } from "@mui/material";
import theme from "@src/theme";
import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";
export interface ITextInputProps {
  placeHolder?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  type?: HTMLInputTypeAttribute;
  inputProps?: Partial<InputProps>;
  label?: string;
}

const InputFieldTypography = (props: ITextInputProps) => {
  return (
    <Box display={"flex"} flexDirection={"column"} gap={1.5}>
      <Typography variant="body1" color={theme.palette.text.black}>
        {props.label}
      </Typography>
      <InputField
        id="homeSearchBar"
        placeholder={props.placeHolder}
        InputProps={props.inputProps}
        type={props.type}
        onChange={props.onChange}
        value={props.value}
      />
    </Box>
  );
};

export default InputFieldTypography;
