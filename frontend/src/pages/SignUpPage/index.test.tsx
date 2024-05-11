import { render, screen } from "@testing-library/react";
import SignUpPage from ".";
import { BrowserRouter } from "react-router-dom";

test("Render the compoent", () => {
  render(
    <BrowserRouter>
      <SignUpPage />
    </BrowserRouter>
  );
  expect(screen.getByTestId("test-page")).toBeInTheDocument();
});
