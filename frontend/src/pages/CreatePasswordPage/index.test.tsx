import { render, screen } from "@testing-library/react";
import CreatePasswordPage from ".";
import { BrowserRouter } from "react-router-dom";

test("Test create password page", () => {
  render(
    <BrowserRouter>
      <CreatePasswordPage />
    </BrowserRouter>
  );
  expect(screen.getByTestId("test-page")).toBeInTheDocument();
});
