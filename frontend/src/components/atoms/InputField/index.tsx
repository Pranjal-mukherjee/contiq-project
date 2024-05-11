import { TextField, TextFieldProps } from "@mui/material";

const InputField = (props: TextFieldProps) => {
  return (
    <TextField {...props} focused={false} data-test-id="inputField-test" />
  );
};

export default InputField;
