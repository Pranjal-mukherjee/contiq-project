import {
  CREATE_ACCOUNT,
  EMAIL_PLACEHOLDER,
  EMAIL_VALIDATION_MESSAGE,
  GOOGLE_SIGNIN_TEXT,
  NAME_PLACEHOLDER,
  PASSWORD_PLACEHOLDER,
  PASSWORD_VALIDATION_MESSAGE,
  USERNAME_VALIDATION_MESSAGE,
} from "@src/utils/constants";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import SignUp from "./";
import { BrowserRouter } from "react-router-dom";
import { addNewUser, verifyUser } from "@src/services/UserService";
import * as router from "react-router";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const mockUserData = [
  {
    id: 1,
    userName: "John",
    email: "john7@example.com",
    password: "Pwd@1234",
  },
];
const newUserData = {
  id: 1,
  userName: "John",
  email: "john4@example.com",
  password: "Pwd@1234",
};
const mockProps = {
  signUpHeading: "Sign Up",
  googleSignInText: "Sign up with Google",
};

jest.mock("axios");
jest.mock("@src/services/UserService", () => ({
  verifyUser: jest.fn(() => Promise.resolve(false)),
  addNewUser: jest.fn(() => Promise.resolve({ id: "1" })),
}));
jest.mock("@auth0/auth0-react", () => ({
  useAuth0: jest.fn(),
}));

const loginWithRedirectMock = jest.fn();
(useAuth0 as jest.Mock).mockReturnValue({
  loginWithRedirect: loginWithRedirectMock,
});

const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.post.mockResolvedValueOnce({
  data: newUserData,
});

const navigate = jest.fn();
jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);

test("SignUp Component", async () => {
  render(
    <BrowserRouter>
      <SignUp {...mockProps} />
    </BrowserRouter>
  );
  jest.mock("@src/services/UserService", () => ({
    verifyUser: jest.fn(() => Promise.resolve(true)),
  }));
  const pwdElement = screen.getByPlaceholderText(PASSWORD_PLACEHOLDER);
  const emailElement = screen.getByPlaceholderText(EMAIL_PLACEHOLDER);
  const nameElement = screen.getByPlaceholderText(NAME_PLACEHOLDER);
  fireEvent.change(nameElement, { target: { value: "John12" } });
  const nameError = screen.getByText(USERNAME_VALIDATION_MESSAGE);
  expect(nameError).toBeInTheDocument();
  fireEvent.change(emailElement, { target: { value: "John12" } });
  const emailError = screen.getByText(EMAIL_VALIDATION_MESSAGE);
  expect(emailError).toBeInTheDocument();
  fireEvent.change(pwdElement, { target: { value: "John12" } });
  const pwdError = screen.getByText(PASSWORD_VALIDATION_MESSAGE);
  expect(pwdError).toBeInTheDocument();

  fireEvent.change(pwdElement, { target: { value: "Pwd@1234" } });
  fireEvent.change(emailElement, { target: { value: "john@example.com" } });
  fireEvent.change(nameElement, { target: { value: "John" } });
  await act(async () => {
    const createButton = screen.getByText(CREATE_ACCOUNT);
    expect(createButton).toBeInTheDocument();

    fireEvent.click(createButton);

    const googleSignIn = screen.getByText(GOOGLE_SIGNIN_TEXT);
    expect(googleSignIn).toBeInTheDocument();
    fireEvent.click(googleSignIn);
  });
});
test("New User Ready", async () => {
  render(
    <BrowserRouter>
      <SignUp {...mockProps} />
    </BrowserRouter>
  );
  jest.mock("@src/services/UserService", () => ({
    verifyUser: jest.fn(() => Promise.resolve(false)),
    addNewUser: jest.fn(() => Promise.resolve({ id: "1" })),
  }));

  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.post.mockResolvedValueOnce({
    data: newUserData,
  });

  const navigate = jest.fn();
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  const pwdElement = screen.getByPlaceholderText(PASSWORD_PLACEHOLDER);
  const emailElement = screen.getByPlaceholderText(EMAIL_PLACEHOLDER);
  const nameElement = screen.getByPlaceholderText(NAME_PLACEHOLDER);

  fireEvent.change(pwdElement, { target: { value: "Pwd@1234" } });
  fireEvent.change(emailElement, { target: { value: "john4@example.com" } });
  fireEvent.change(nameElement, { target: { value: "John" } });
  await act(async () => {
    const createButton = screen.getByText(CREATE_ACCOUNT);
    expect(createButton).toBeInTheDocument();

    fireEvent.click(createButton);

    await waitFor(() => {
      expect(addNewUser).toHaveBeenCalledWith(
        "John",
        "john4@example.com",
        "Pwd@1234"
      );
      expect(navigate).toHaveBeenCalledWith("/");
    });
  });

  const googleSignIn = screen.getByText(GOOGLE_SIGNIN_TEXT);
  expect(googleSignIn).toBeInTheDocument();
  fireEvent.click(googleSignIn);
});
