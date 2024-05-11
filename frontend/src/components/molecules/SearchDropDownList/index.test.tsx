import { ThemeProvider } from "@mui/system";
import theme from "@src/theme";
import { fireEvent, render } from "@testing-library/react";
import SearchDropDownList from ".";
import { FILE_DATA, SEARCH_FILE_LIST } from "../../../utils/constants";

describe("SearchDropDownList", () => {
  it("renders the component with correct data", () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <SearchDropDownList
          data={FILE_DATA}
          onClick={mockOnClick}
          visible={true}
          handleClose={() => {}}
        />
      </ThemeProvider>
    );

    expect(getByText(SEARCH_FILE_LIST[0])).toBeInTheDocument();
    expect(getByText(FILE_DATA[0].fileName)).toBeInTheDocument();
    expect(getByText(SEARCH_FILE_LIST[1])).toBeInTheDocument();
  });

  it("calls onClick handler with the correct item ID when an item is clicked", () => {
    const mockOnClick = jest.fn();

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <SearchDropDownList
          data={FILE_DATA}
          onClick={mockOnClick}
          visible={true}
          handleClose={() => {}}
        />
      </ThemeProvider>
    );

    fireEvent.click(getByText(FILE_DATA[0].fileName));
    expect(mockOnClick).toHaveBeenCalledWith(
      FILE_DATA[0].fileName,
      "/files/contiq.pdf",
      ["", ""],
      1
    );
  });
});
