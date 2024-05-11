import ImageComponent from "@components/atoms/Image";
import LoginTemplate from "@components/templates/Login";
import LoginImage from "../../../public/assets/images/login.png";
import { Box } from "@mui/material";
import React from "react";
import CreateNewPassword from "@components/organisms/CreateNewPassword";
import {
  CONFIRM_NEW_PASSWORD,
  CREATE_NEW_PWD_PLACEHOLDER,
  NEW_PASSWORD,
  NEW_PWD_HEADING,
  NEW_PWD_MESSAGE,
} from "@src/utils/constants";

const CreatePasswordPage = () => {
  return (
    <Box data-testid="test-page">
      <LoginTemplate
        leftPanel={
          <ImageComponent imgSrc={LoginImage} width={"100%"} height={"100%"} />
        }
        rightPanel={
          <CreateNewPassword
            placeHolderText={CREATE_NEW_PWD_PLACEHOLDER}
            newPwdLabel={NEW_PASSWORD}
            confirmPwdlabel={CONFIRM_NEW_PASSWORD}
            createPwdHeading={NEW_PWD_HEADING}
            message={NEW_PWD_MESSAGE}
          />
        }
      />
    </Box>
  );
};

export default CreatePasswordPage;
