import { render } from "@testing-library/react";
import ResetPasswordPage from "./";
import { BrowserRouter } from "react-router-dom";

test("SignUp Component", async () => {
  const { container } = render(
    <BrowserRouter>
      <ResetPasswordPage />
    </BrowserRouter>
  );

  expect(container).toBeInTheDocument();
});
