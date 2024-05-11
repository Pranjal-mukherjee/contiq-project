import { useAuth0 } from "@auth0/auth0-react";
import MuiButton from "@components/atoms/Button";
import ImageComponent from "@components/atoms/Image";
import InputFieldTypography from "@components/molecules/InputFieldTypography";
import { Box, Divider, Link, Typography } from "@mui/material";
import { addNewUser, verifyUser } from "@src/services/UserService";
import theme from "@src/theme";
import {
  CREATE_ACCOUNT,
  EMAIL_LABEL,
  EMAIL_PLACEHOLDER,
  EMAIL_VALIDATION_MESSAGE,
  EXISTING_SIGNIN_TEXT,
  GOOGLE_SIGNIN_TEXT,
  NAME_LABEL,
  NAME_PLACEHOLDER,
  NAVIGATE_SIGNIN,
  OR,
  PASSWORD_LABEL,
  PASSWORD_PLACEHOLDER,
  PASSWORD_REGEX,
  PASSWORD_VALIDATION_MESSAGE,
  SIGN_IN,
  SIGN_UP_HEADING,
  USERNAME_REGEX,
  USERNAME_VALIDATION_MESSAGE,
} from "@src/utils/constants";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import GoogleIcon from "../../../../public/assets/icons/Google.svg";
import { GoogleButton } from "../SignIn";

export interface ISignUpProps {}

function googleSignUp(props: ISignUpProps) {
  return (
    <Box display={"flex"} gap={2}>
      <ImageComponent imgSrc={GoogleIcon} />
      <Typography
        variant="body1"
        color={theme.palette.grays?.gray500}
        alignSelf={"center"}
      >
        {GOOGLE_SIGNIN_TEXT}
      </Typography>
    </Box>
  );
}

const SingUp = (props: ISignUpProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [newPwdError, setNewPwdError] = useState<string | null>(null);
  const [userNameError, setUserNameError] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (
      email &&
      newPassword &&
      username &&
      !newPwdError &&
      !emailError &&
      !userNameError
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, newPassword, username]);
  const { loginWithRedirect } = useAuth0();
  function handlePasswordChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    const val = event.target.value;

    if (val?.length >= 8 && PASSWORD_REGEX.test(val)) {
      setNewPwdError(null);
    } else {
      setNewPwdError(PASSWORD_VALIDATION_MESSAGE);
    }

    setNewPassword(event.target.value);
  }

  function handleEmailChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    const val = event.target.value;

    if (isEmail(val)) {
      setEmailError(null);
    } else {
      setEmailError(EMAIL_VALIDATION_MESSAGE);
    }

    setEmail(event.target.value);
  }

  function handleUserNameChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    if (USERNAME_REGEX.test(event.target.value)) {
      setUserNameError(null);
    } else {
      setUserNameError(USERNAME_VALIDATION_MESSAGE);
    }
    setUsername(event.target.value);
  }

  const handleCreateAccount = async () => {
    const existingUser = await verifyUser(email);
    if (existingUser) {
      window.alert("User Already Exists!");
    } else {
      const res = await addNewUser(username, email, newPassword);
      if (res) {
        localStorage.clear();
        navigate(NAVIGATE_SIGNIN);
      } else {
        window.alert("Some Error Occured");
      }
    }
  };

  function handleGoogleSignUp(): void {
    loginWithRedirect();
  }

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignContent={"space-between"}
      gap={9}
      width={"100%"}
    >
      <Box display={"flex"} flexDirection={"column"}>
        <Typography variant="h2" color={theme.palette.text.black}>
          {SIGN_UP_HEADING}
        </Typography>
      </Box>
      <Box display={"flex"} flexDirection={"column"} gap={theme.spacing(5)}>
        <InputFieldTypography
          placeHolder={NAME_PLACEHOLDER}
          value={username}
          type="text"
          label={NAME_LABEL}
          inputProps={{
            sx: {
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "22px",
              fontFamily: "Manrope",
              fontStyle: "normal",
            },
          }}
          onChange={handleUserNameChange}
        />
        {userNameError && (
          <Typography variant="body2" color={theme.palette.error.main}>
            {userNameError}
          </Typography>
        )}
        <InputFieldTypography
          placeHolder={EMAIL_PLACEHOLDER}
          value={email}
          type="email"
          label={EMAIL_LABEL}
          inputProps={{
            sx: {
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "22px",
              fontFamily: "Manrope",
              fontStyle: "normal",
            },
          }}
          onChange={handleEmailChange}
        />
        {emailError && (
          <Typography variant="body2" color={theme.palette.error.main}>
            {emailError}
          </Typography>
        )}
        <InputFieldTypography
          placeHolder={PASSWORD_PLACEHOLDER}
          value={newPassword}
          type="password"
          label={PASSWORD_LABEL}
          inputProps={{
            sx: {
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "22px",
              fontFamily: "Manrope",
              fontStyle: "normal",
            },
          }}
          onChange={handlePasswordChange}
        />
        {newPwdError && (
          <Typography variant="body2" color={theme.palette.error.main}>
            {newPwdError}
          </Typography>
        )}
      </Box>
      <MuiButton
        text={
          <Typography variant="body1" color={theme.palette.text.white}>
            {CREATE_ACCOUNT}
          </Typography>
        }
        variant={"contained"}
        onClick={handleCreateAccount}
        fullWidth
        sx={{ padding: "16px 8px" }}
        disabled={isDisabled}
      />
      <Divider>
        <Typography
          variant="caption1"
          color={theme.palette.text.mediumEmphasis}
        >
          {OR}
        </Typography>
      </Divider>
      <GoogleButton
        variant={"outlined"}
        onClick={handleGoogleSignUp}
        fullWidth
        sx={{
          padding: "15px 10px",
          borderRadius: theme.spacing(1),
          background: theme.palette.grays.gray600,
          border: "none",
        }}
      >
        {googleSignUp(props)}
      </GoogleButton>
      <Box alignSelf={"center"}>
        <span>
          <Typography
            variant="caption1"
            color={theme.palette.text.mediumEmphasis}
          >
            {EXISTING_SIGNIN_TEXT}
          </Typography>
          <Typography variant="caption1" color={theme.palette.primary.main}>
            <Link href={NAVIGATE_SIGNIN} underline="none">
              {SIGN_IN}
            </Link>
          </Typography>
        </span>
      </Box>
    </Box>
  );
};

export default SingUp;
