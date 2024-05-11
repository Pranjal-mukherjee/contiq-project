import { useAuth0 } from "@auth0/auth0-react";
import MuiButton from "@components/atoms/Button";
import ImageComponent from "@components/atoms/Image";
import InputFieldTypography from "@components/molecules/InputFieldTypography";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Link,
  Typography,
  styled,
} from "@mui/material";
import { generateTokenForUser, verifyUser } from "@src/services/UserService";
import theme from "@src/theme";
import {
  EMAIL_ID,
  EMAIL_PLACEHOLDER,
  EMAIL_VALIDATION_MESSAGE,
  FORGOT_PASSWORD,
  GOOGLE_SIGNIN_TEXT,
  NAVIGATE_HOME,
  NAVIGATE_RESETPASSWORD,
  NAVIGATE_SIGNUP,
  NO_ACCOUNT_TEXT,
  OR,
  PASSWORD_LABEL,
  PASSWORD_PLACEHOLDER,
  PASSWORD_REGEX,
  PASSWORD_VALIDATION_MESSAGE,
  REMEMBER_ME,
  SIGN_IN,
  SIGN_IN_HEADING,
  SIGN_IN_VALIDATION,
  SIGN_UP,
} from "@src/utils/constants";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import GoogleIcon from "../../../../public/assets/icons/Google.svg";

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

export const GoogleButton = styled(Button)(() => ({
  "&.MuiButton-root": {
    textTransform: "none",
    borderRadius: "4px",
    color: theme.palette.text.white,
    boxShadow: "none",
    ":disabled": {
      backgroundColor: theme.palette.primary.light,
    },
    "&:hover": {
      background: `var(--structural-structural, #F4F5F5);`,
      border: "none",
    },
  },
  "& .MuiButton-startIcon svg, .MuiButton-endIcon svg": {
    display: "flex",
    placeContent: "center",
  },
}));

const SignIn = (props: ISignUpProps) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [newPwdError, setNewPwdError] = useState<string | null>(null);
  const [isSignInDisabled, setIsSignInDisabled] = useState<boolean>(true);
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();
  function handlePasswordChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    const val = event.target.value;

    if (val.length >= 8 && PASSWORD_REGEX.test(val)) {
      setNewPwdError(null);
    } else {
      setNewPwdError(PASSWORD_VALIDATION_MESSAGE);
    }

    setNewPassword(event.target.value);
    updateSignInButtonState(val, email);
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
    updateSignInButtonState(newPassword, val);
  }

  const handleSignIn = async () => {
    const user = await verifyUser(email);
    if (user && user.password === newPassword) {
      await generateTokenForUser(email,newPassword).then(
        (res)=>{
          sessionStorage.setItem("token",res);
          navigate(NAVIGATE_HOME);
        }
      )
      
    } else {
      localStorage.clear();
      window.alert(SIGN_IN_VALIDATION);
    }
  };

  const handleGoogleSignIn = () => {
    loginWithRedirect();
  };

  function updateSignInButtonState(
    password: string | null,
    email: string | null
  ): void {
    if (email && password)
      setIsSignInDisabled(
        !(
          isEmail(email) &&
          password.length >= 8 &&
          PASSWORD_REGEX.test(password)
        )
      );
  }

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignContent={"space-between"}
      gap={8}
      width={"100%"}
      marginBottom={theme.spacing(20)}
    >
      <Box display={"flex"} flexDirection={"column"}>
        <Typography variant="h2" color={theme.palette.text.black}>
          {SIGN_IN_HEADING}
        </Typography>
      </Box>
      <Box display={"flex"} flexDirection={"column"} gap={"24px"}>
        <Box>
          <InputFieldTypography
            placeHolder={EMAIL_PLACEHOLDER}
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
            onChange={handleEmailChange}
          />
          {emailError && (
            <Typography variant="body2" color={theme.palette.error.main}>
              {emailError}
            </Typography>
          )}
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap={theme.spacing(2)}>
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
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box display={"flex"} gap={1}>
              <Checkbox
                disabled
                sx={{ maxWidth: theme.spacing(5), maxHeight: theme.spacing(5) }}
              />
              <Box display={"flex"}>
                <Typography
                  variant="caption1"
                  color={theme.palette.text.lowEmphasis}
                  alignSelf={"end"}
                >
                  {REMEMBER_ME}
                </Typography>
              </Box>
            </Box>
            <Link
              href={NAVIGATE_RESETPASSWORD}
              underline="none"
              alignSelf={"end"}
            >
              <Typography variant="caption1" color={theme.palette.primary.main}>
                {FORGOT_PASSWORD}
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
      <Box display={"flex"} flexDirection={"column"} gap={theme.spacing(7)}>
        <MuiButton
          text={
            <Typography variant="body1" color={theme.palette.text.white}>
              {SIGN_IN}
            </Typography>
          }
          variant={"contained"}
          onClick={handleSignIn}
          fullWidth
          sx={{ padding: "16px 8px" }}
          disabled={isSignInDisabled}
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
          onClick={handleGoogleSignIn}
          fullWidth
          sx={{
            padding: "11px 10px",
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
              {NO_ACCOUNT_TEXT}
            </Typography>
            <Typography variant="caption1" color={theme.palette.primary.main}>
              <Link href={NAVIGATE_SIGNUP} underline="none">
                {SIGN_UP}
              </Link>
            </Typography>
          </span>
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;
