import ImageComponent from "@components/atoms/Image";
import LoginTemplate from "@components/templates/Login";
import LoginImage from "../../../public/assets/images/login.png";
import React from "react";
import SignUp from "@components/organisms/SignUp";
import { Box } from "@mui/material";

const SignUpPage = () => {
  return (
    <Box data-testid="test-page">
      <LoginTemplate
        leftPanel={
          <ImageComponent imgSrc={LoginImage} width={"100%"} height={"100%"} />
        }
        rightPanel={<SignUp signUpHeading={"Sign Up"} />}
      />
    </Box>
  );
};

export default SignUpPage;
