import ImageComponent from "@components/atoms/Image";
import SignIn from "@components/organisms/SignIn";
import LoginTemplate from "@components/templates/Login";
import LoginImage from "../../../public/assets/images/login.png";

const SignInPage = () => {
  return (
    <LoginTemplate
      rightPanel={<SignIn />}
      leftPanel={
        <ImageComponent imgSrc={LoginImage} width={"100%"} height={"100%"} />
      }
    />
  );
};

export default SignInPage;
