import MuiButton from "@components/atoms/Button";
import InputFieldTypography from "@components/molecules/InputFieldTypography";
import { Box, Typography } from "@mui/material";
import { verifyUser } from "@src/services/UserService";
import theme from "@src/theme";
import {
  EMAIL_ID,
  NAVIGATE_CREATEPASSWORD,
  PLACEHOLDER_TEXT,
  RESET_PASSWORD,
  RESET_PWD_MESSAGE,
  RESET_PWD_MESSAGE_NEW_LINE,
  SEND,
} from "@src/utils/constants";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import isEmail from "validator/lib/isEmail";

export interface IResetPasswordProps {}

const ResetPassword = (props: IResetPasswordProps) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isResetDisabled, setIsResetDisabled] = useState<boolean>(true);
  const navigate = useNavigate();
  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    const val = event.target.value;

    if (isEmail(val)) {
      setError(null);
    } else {
      setError("Invalid Email address");
    }

    setEmail(event.target.value);
    updateSignInButtonState(email);
  }

  const handleClick = async () => {
    const res = await verifyUser(email);
    if (res) navigate(NAVIGATE_CREATEPASSWORD, { state: { email: email } });
    else {
      window.alert("User Does Not Exists!");
    }
  };

  function updateSignInButtonState(email: string | null): void {
    if (email) setIsResetDisabled(!isEmail(email));
  }

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      width={"25vw"}
      height={"45vh"}
      alignContent={"space-between"}
      gap={9}
      marginBottom={theme.spacing(80)}
    >
      <Box display={"flex"} flexDirection={"column"} gap={1.5}>
        <Typography variant="h2" color={theme.palette.text.black}>
          {RESET_PASSWORD}
        </Typography>
        <Box display={"flex"} flexDirection={"column"}>
          <Typography
            variant="overline1"
            color={theme.palette.text.mediumEmphasis}
          >
            {RESET_PWD_MESSAGE}
          </Typography>
          <Typography
            variant="overline1"
            color={theme.palette.text.mediumEmphasis}
          >
            {RESET_PWD_MESSAGE_NEW_LINE}
          </Typography>
        </Box>
      </Box>
      <Box display={"flex"} flexDirection={"column"} gap={7}>
        <Box>
          <InputFieldTypography
            placeHolder={PLACEHOLDER_TEXT}
            value={email}
            type="email"
            label={EMAIL_ID}
            inputProps={{
              sx: {
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "22px",
                fontFamily: "Manrope",
                fontStyle: "normal",
              },
            }}
            onChange={handleChange}
          />
          {error && (
            <Typography variant="body2" color={theme.palette.error.main}>
              {error}
            </Typography>
          )}
        </Box>
      </Box>
      <MuiButton
        text={
          <Typography variant="body1" color={theme.palette.text.white}>
            {SEND}
          </Typography>
        }
        variant={"contained"}
        onClick={handleClick}
        fullWidth
        sx={{ padding: "15px 8px" }}
        disabled={isResetDisabled}
        data-testid="test-button"
      />
    </Box>
  );
};

export default ResetPassword;
