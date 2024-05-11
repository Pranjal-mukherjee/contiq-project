import { render } from "@testing-library/react";
import SignInPage from "./";
import { BrowserRouter } from "react-router-dom";

test("SignUp Component", async () => {
  const { container } = render(
    <BrowserRouter>
      <SignInPage />
    </BrowserRouter>
  );

  expect(container).toBeInTheDocument();
});
