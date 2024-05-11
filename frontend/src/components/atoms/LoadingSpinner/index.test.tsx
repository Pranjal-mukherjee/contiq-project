import { render } from "@testing-library/react";
import StyledCircularLoad from ".";

test("Test - HomeHeader", () => {
  const { container } = render(
    <StyledCircularLoad loaderColor="primary"></StyledCircularLoad>
  );
  expect(container).toBeInTheDocument();
});
