import MuiButton from "@components/atoms/Button";
import IconComponent from "@components/atoms/Icon";
import CustomTypography from "@components/atoms/Typography";
import InputFieldTypography from "@components/molecules/InputFieldTypography";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import theme from "@src/theme";
import React, { ChangeEvent, useEffect, useState } from "react";
import Success from "../../../../public/assets/icons/success.svg";

import { updatePassword } from "@src/services/UserService";
import {
  CLICK_ON_CONTINUE,
  NAVIGATE_SIGNIN,
  PASSWORD_NOT_MATCHING as PASSWORDS_NOT_MATCHING,
  PASSWORD_REGEX,
  PASSWORD_RESET,
  PASSWORD_VALIDATION_MESSAGE,
  RESET_PWD_BUTTON_TEXT,
  RESET_TEXT,
} from "@src/utils/constants";
import { useLocation, useNavigate } from "react-router-dom";

interface ICreateNewPasswordProps {
  confirmPwdlabel: string;
  placeHolderText?: string;
  createPwdHeading: string;
  newPwdLabel: string;
  message: string | undefined;
}

const HomeContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "32px",
  width: "390px",
  marginBottom: "550px",
});

const TextContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
});

const IconContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  gap: "20px",
});

const StyledButton = styled(MuiButton)({
  padding: "13px 8px",
});

const StyledIcon = styled(IconComponent)({
  marginTop: "5px",
});

const ResetPassword = () => {
  const navigate = useNavigate();
  const handleClick = (): void => {
    navigate(NAVIGATE_SIGNIN);
  };
  return (
    <HomeContainer data-testid="test-reset">
      <TextContainer>
        <IconContainer>
          <CustomTypography variant="h2" color={theme.palette.text.black}>
            {PASSWORD_RESET}
          </CustomTypography>
          <StyledIcon src={Success} />
        </IconContainer>
        <Box display={"flex"} flexDirection={"column"}>
          <CustomTypography
            variant="overline1"
            color={theme.palette.text.mediumEmphasis}
          >
            {RESET_TEXT}
          </CustomTypography>
          <CustomTypography
            variant="overline1"
            color={theme.palette.text.mediumEmphasis}
          >
            {CLICK_ON_CONTINUE}
          </CustomTypography>
        </Box>
      </TextContainer>
      <StyledButton
        variant="contained"
        fullWidth
        text="Continue"
        onClick={handleClick}
      />
    </HomeContainer>
  );
};

const CreatePassword = (
  props: ICreateNewPasswordProps & {
    setIsResetClicked: React.Dispatch<React.SetStateAction<boolean>>;
  }
) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [newPwdError, setNewPwdError] = useState<string | null>(null);
  const [confirmPwdError, setConfirmPwdError] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const location = useLocation();
  const email = location.state?.email;
  useEffect(() => {
    setIsDisabled(
      !(newPassword && confirmNewPassword && !newPwdError && !confirmPwdError)
    );
  }, [newPassword, confirmNewPassword, newPwdError, confirmPwdError]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const val = event.target.value;

    if (val.length >= 8 && PASSWORD_REGEX.test(val)) {
      setNewPwdError(null);
    } else {
      setNewPwdError(PASSWORD_VALIDATION_MESSAGE);
    }

    setNewPassword(val);
  };

  const handleChangeconfirm = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const val = event.target.value;

    if (val === newPassword) {
      setConfirmPwdError(null);
    } else {
      setConfirmPwdError(PASSWORDS_NOT_MATCHING);
    }

    setConfirmNewPassword(val);
  };
  const handlePasswordChange = async () => {
    const res = await updatePassword(email, newPassword);
    if (res) props.setIsResetClicked(true);
    else {
      window.alert("Somthing error occurred");
    }
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      width={"446px"}
      alignContent={"space-between"}
      gap={9}
      marginBottom={"305px"}
    >
      <Box display={"flex"} flexDirection={"column"} gap={theme.spacing(1)}>
        <Typography variant="h2" color={theme.palette.text.black}>
          {props.createPwdHeading}
        </Typography>
        <Typography
          variant="overline1"
          color={theme.palette.text.mediumEmphasis}
          maxWidth={theme.spacing(61)}
        >
          {props.message}
        </Typography>
      </Box>
      <Box display={"flex"} flexDirection={"column"} gap={theme.spacing(7)}>
        <Box>
          <InputFieldTypography
            placeHolder={props.placeHolderText}
            value={newPassword}
            type="password"
            label={props.newPwdLabel}
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
          {newPwdError && (
            <Typography variant="body2" color={theme.palette.error.main}>
              {newPwdError}
            </Typography>
          )}
        </Box>
        <Box>
          <InputFieldTypography
            placeHolder={props.placeHolderText}
            value={confirmNewPassword}
            type="password"
            label={props.confirmPwdlabel}
            inputProps={{
              sx: {
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "22px",
                fontFamily: "Manrope",
                fontStyle: "normal",
              },
            }}
            onChange={handleChangeconfirm}
          />
          {confirmPwdError && (
            <Typography variant="body2" color={theme.palette.error.main}>
              {confirmPwdError}
            </Typography>
          )}
        </Box>
      </Box>
      <MuiButton
        text={
          <Typography variant="body1" color={theme.palette.text.white}>
            {RESET_PWD_BUTTON_TEXT}
          </Typography>
        }
        variant={"contained"}
        onClick={handlePasswordChange}
        fullWidth
        sx={{ padding: "16px 8px" }}
        disabled={isDisabled}
        data-testid="test-button"
      />
    </Box>
  );
};

const CreateNewPassword = (props: ICreateNewPasswordProps) => {
  const [isResetClicked, setIsResetClicked] = useState<boolean>(false);
  return isResetClicked ? (
    <ResetPassword />
  ) : (
    <CreatePassword {...props} setIsResetClicked={setIsResetClicked} />
  );
};

export default CreateNewPassword;
