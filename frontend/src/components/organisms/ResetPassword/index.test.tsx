import { PLACEHOLDER_TEXT } from "@src/utils/constants";
import { fireEvent, render, screen } from "@testing-library/react";
import ResetPassword from ".";
import { BrowserRouter } from "react-router-dom";
const mockUserData = [
  {
    id: 1,
    userName: "John",
    email: "john@example.com",
    password: "Pwd@1234",
    notification_count: 0,
  },
];
jest.mock("axios");
jest.mock("../../../services/UserService", () => ({
  verifyUser: jest.fn(() => Promise.resolve({ data: mockUserData })),
}));
test("Test - ResetPassword", () => {
  render(
    <BrowserRouter>
      <ResetPassword />
    </BrowserRouter>
  );
  const inputElement = screen.getAllByPlaceholderText(PLACEHOLDER_TEXT);

  fireEvent.change(inputElement[0], {
    target: { value: "john@example.com" },
  });
  expect(inputElement).toBeInTheDocument;

  const nullErrorMessage = screen.queryByText(/Invalid Email address/i);
  expect(nullErrorMessage).toBeNull();

  fireEvent.change(inputElement[0], {
    target: { value: "invalid-mail@.com" },
  });
  const errorMessage = screen.queryByText(/Invalid Email address/i);
  expect(errorMessage).toBeInTheDocument;
  const submitButton = screen.getByRole("button");
  fireEvent.click(submitButton);
});
