import { render } from "@testing-library/react";
import PDFPagination from ".";

test("Test - HomeHeader", () => {
  const { container } = render(
    <PDFPagination
      percentage={85}
      totalPages={1}
      pageNumber={5}
      handleDecrement={undefined}
      hanldeIncrement={undefined}
    />
  );
  expect(container).toBeInTheDocument();
});
