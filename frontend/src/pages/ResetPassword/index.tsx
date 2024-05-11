import ImageComponent from "@components/atoms/Image";
import ResetPassword from "@components/organisms/ResetPassword";
import LoginTemplate from "@components/templates/Login";
import { Box } from "@mui/material";
import LoginImage from "../../../public/assets/images/login.png";

const ResetPasswordPage = () => {
  return (
    <LoginTemplate
      rightPanel={
        <Box>
          <ResetPassword />
        </Box>
      }
      leftPanel={
        <ImageComponent imgSrc={LoginImage} width={"100%"} height={"100%"} />
      }
    />
  );
};

export default ResetPasswordPage;
