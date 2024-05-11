import { EMAIL_ID } from "@src/utils/constants";
import { render } from "@testing-library/react";
import InputFieldTypography from ".";

test("Test - HomeHeader", () => {
  const { container } = render(
    <InputFieldTypography
      label={EMAIL_ID}
      value={EMAIL_ID}
      onChange={undefined}
      type={"search"}
      inputProps={undefined}
    ></InputFieldTypography>
  );
  expect(container).toBeInTheDocument();
});
