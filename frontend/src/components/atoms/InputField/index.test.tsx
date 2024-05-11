import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import InputField from "./index";

test("renders an input field with placeholder text", () => {
  render(<InputField placeholder="Enter text" data-testid="inputField-test" />);

  const inputElement = screen.getByTestId("inputField-test");

  expect(inputElement).toBeInTheDocument();
});
