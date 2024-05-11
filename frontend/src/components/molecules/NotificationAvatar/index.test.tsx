import { render } from "@testing-library/react";
import Notification from ".";

test("Test - Notification", () => {
  const { container } = render(
    <Notification
      timestamp={"20  June  10:30 AM"}
      message={"Amit has uploaded company agreement.pdf"}
    />
  );
  expect(container).toBeInTheDocument();
});
