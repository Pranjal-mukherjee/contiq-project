import { ThemeProvider } from "@emotion/react";
import theme from "@src/theme";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SideBar from "./index";

describe("Testing the SideBar", () => {
  test("renders SideBar with initial state", () => {
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <SideBar />
        </BrowserRouter>
      </ThemeProvider>
    );

    const homeIcon = screen.getByText("Home");
    const fileIcon = screen.getByText("Files");

    expect(homeIcon).toBeInTheDocument();
    expect(fileIcon).toBeInTheDocument();

    expect(screen.getByTestId("SideBar")).toBeInTheDocument();
  });

  test("Footer icon is rendered", () => {
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <SideBar />
        </BrowserRouter>
      </ThemeProvider>
    );

    const icons = screen.getAllByRole("img");
    const footerIcon = icons[6];
    expect(footerIcon).toBeInTheDocument();
  });

  test("clicking on Home icon and File icon", () => {
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <SideBar />
        </BrowserRouter>
      </ThemeProvider>
    );

    const icons = screen.getAllByRole("img");
    const homeIcon = icons[0];
    const fileIcon = icons[4];
    const homeText = screen.getByText("Home");
    const fileText = screen.getByText("Files");

    fireEvent.click(homeIcon);
    expect(homeText).toHaveStyle(`color: ${theme.palette.text.white}`);
    expect(fileText).toHaveStyle(`color: ${theme.palette.grays.gray200}`);

    fireEvent.click(fileIcon);
    expect(fileText).toHaveStyle(`color: ${theme.palette.text.white}`);
    expect(homeText).toHaveStyle(`color: ${theme.palette.grays.gray200}`);
  });
});
