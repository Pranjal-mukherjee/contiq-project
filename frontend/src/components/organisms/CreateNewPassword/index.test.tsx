import { fireEvent, render, screen } from "@testing-library/react";
import CreateNewPassword from ".";
import { BrowserRouter } from "react-router-dom";
import { PASSWORD_NOT_MATCHING } from "@src/utils/constants";

jest.mock("axios");
jest.mock("@src/services/UserService", () => ({
  updatePassword: jest.fn((email, password) => {
    if (password === "Strong!123") {
      return Promise.resolve({ data: ["Strong!123"] });
    } else {
      return Promise.reject(new Error("Something went wrong"));
    }
  }),
}));

test("Test - CreateNewPassword", async () => {
  const { getAllByPlaceholderText } = render(
    <BrowserRouter>
      <CreateNewPassword
        newPwdLabel="New Password"
        confirmPwdlabel="Confirm Password"
        message="Enter your new password"
        createPwdHeading="Create New Password"
        placeHolderText="Enter your password"
      />
    </BrowserRouter>
  );

  const newPasswordInput = getAllByPlaceholderText("Enter your password");

  fireEvent.change(newPasswordInput[0], { target: { value: "weak" } });

  fireEvent.change(newPasswordInput[0], { target: { value: "Strong!123" } });

  const nullErrorMessage = screen.queryByText(
    /Password must be at least 8 characters and contain 1 uppercase letter, 1 lower case letter, 1 numeric, and 1 special character./i
  );
  expect(nullErrorMessage).toBeNull();

  fireEvent.change(newPasswordInput[0], { target: { value: "Strong!123" } });
  fireEvent.change(newPasswordInput[1], { target: { value: "Strong123" } });
  expect(screen.getByText(PASSWORD_NOT_MATCHING)).toBeInTheDocument();
  fireEvent.change(newPasswordInput[1], { target: { value: "Strong!123" } });
  const errorMessage = screen.queryByText(/Passwords dont match/i);
  expect(errorMessage).toBeNull();
  const confirmButton = screen.getByRole("button");
  fireEvent.click(confirmButton);
});
