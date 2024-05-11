import { render } from "@testing-library/react";
import FileCard from ".";


test("Test - Notification", () => {
  const { container } = render(
    <FileCard
      fileName={"Company Profile.pdf"}
    
    />
  );
  expect(container).toBeInTheDocument();
});
