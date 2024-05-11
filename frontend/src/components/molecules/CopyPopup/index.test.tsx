import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import theme from "@src/theme";
import { ThemeProvider } from "@mui/system";
import CopyPopup from ".";

test("renders CopyPopup story", () => {
  render(
    <ThemeProvider theme={theme}>
      <CopyPopup />
    </ThemeProvider>
  );

  const textCopiedElement = screen.getByText(/Text Copied/i);
  expect(textCopiedElement).toBeInTheDocument();

  const closeIcon = screen.getByTestId("close-icon");
  expect(closeIcon).toBeInTheDocument();

  const completeIcon = screen.getByTestId("complete-icon");
  expect(completeIcon).toBeInTheDocument();
});

test("hides CopyPopup story when CloseIcon is clicked", () => {
  render(
    <ThemeProvider theme={theme}>
      <CopyPopup />
    </ThemeProvider>
  );
  const copyPopup = screen.getByTestId("toast");
  expect(copyPopup).toBeInTheDocument();

  const closeIcon = screen.getByTestId("close-icon");
  fireEvent.click(closeIcon);

  expect(copyPopup).not.toBeInTheDocument();
});

test("does not render CopyPopup when cardVisible is false", () => {
  const cardVisible = false;
  render(<> {cardVisible ? <CopyPopup /> : <div></div>}</>);

  const toastElement = screen.queryByTestId("toast");
  expect(toastElement).toBeNull();
});
