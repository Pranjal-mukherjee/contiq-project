import { render } from "@testing-library/react";
import LoginTemplate from "./";

const mockHandleCreateAccount = jest.fn();

const mockProps = {
  signUpHeading: "Sign Up",
  googleSignInText: "Sign up with Google",
};

test("SignUp Component", async () => {
  const { container } = render(
    <LoginTemplate rightPanel={undefined} leftPanel={undefined} />
  );

  expect(container).toBeInTheDocument();
});
