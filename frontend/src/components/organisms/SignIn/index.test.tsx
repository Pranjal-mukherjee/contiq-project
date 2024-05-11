import {
  GOOGLE_SIGNIN_TEXT,
  NAVIGATE_HOME,
  PASSWORD_PLACEHOLDER,
  PASSWORD_VALIDATION_MESSAGE,
  SIGN_IN,
} from "@src/utils/constants";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import SignIn from "./";
import { BrowserRouter } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import * as router from "react-router";
import axios from "axios";
import { generateTokenForUser, verifyUser } from "@src/services/UserService";
const mockUserData = {
  id: 1,
  userName: "John",
  email: "john@example.com",
  password: "Pwd@1234",
  notification_count: 0,
};

const tokenData = {
  email: "john@example.com",
  password: "Pwd@1234",
};
jest.mock("axios");

const mockProps = {
  signInHeading: "Sign In",
};
jest.mock("@auth0/auth0-react", () => ({
  useAuth0: jest.fn(),
}));

const loginWithRedirectMock = jest.fn();
(useAuth0 as jest.Mock).mockReturnValue({
  loginWithRedirect: loginWithRedirectMock,
});
jest.mock("../../../services/UserService", () => ({
  verifyUser: jest.fn(() => Promise.resolve(mockUserData)),
  generateTokenForUser: jest.fn(() =>
    Promise.resolve({ user: [{ token: "fkewb323" }] })
  ),
}));
jest.mock("../../../utils/Api", () => {
  const instanceMock = {
    create: jest.fn(() => ({
      interceptors: {
        request: {
          use: jest.fn(),
        },
      },
    })),
    post: jest.fn(),
    get: jest.fn(),
  };

  return {
    __esModule: true,
    default: instanceMock,
  };
});
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.post.mockResolvedValueOnce({
  user: tokenData,
});
const navigate = jest.fn();
jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
test("SignIn Component", async () => {
  render(
    <BrowserRouter>
      <SignIn {...mockProps} />
    </BrowserRouter>
  );

  const emailElement = screen.getAllByPlaceholderText("john@example.com");
  fireEvent.change(emailElement[0], {
    target: { value: "john@example.c" },
  });
  fireEvent.change(emailElement[0], {
    target: { value: "john@example.com" },
  });

  const pwdElement = screen.getAllByPlaceholderText(PASSWORD_PLACEHOLDER);
  fireEvent.change(pwdElement[0], {
    target: { value: "Pwd12" },
  });
  expect(screen.getByText(PASSWORD_VALIDATION_MESSAGE)).toBeInTheDocument();
  fireEvent.change(pwdElement[0], {
    target: { value: "Pwd@1234" },
  });

  expect(pwdElement).toBeInTheDocument;
  const googleSignIn = screen.getByRole("button", { name: GOOGLE_SIGNIN_TEXT });
  fireEvent.click(googleSignIn);

  await act(async () => {
    const signIn = screen.getByRole("button", { name: SIGN_IN });
    fireEvent.click(signIn);

    await waitFor(() => {
      expect(verifyUser).toHaveBeenCalledWith("john@example.com");
      expect(generateTokenForUser).toHaveBeenCalledWith(
        "john@example.com",
        "Pwd@1234"
      );
      expect(navigate).toHaveBeenCalledWith(NAVIGATE_HOME);
    });
  });
});
