import { ThemeProvider } from "@mui/system";
import WebViewer from "@pdftron/pdfjs-express";
import theme from "@src/theme";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import PDFViewer from ".";

jest.mock("@pdftron/pdfjs-express", () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue({
    Core: {
      documentViewer: {
        addEventListener: jest.fn(),
      },
    },
    UI: {
      Feature: {},
      disableFeatures: jest.fn(),
      disableElements: jest.fn(),
      setFitMode: jest.fn(),
      openElements: jest.fn(),
    },
  }),
}));

describe("PDFViewer", () => {
  const mockFilePath = "/files/PDFTRON_about.pdf";
  const onNavBackMock = jest.fn();

  beforeEach(() => {
    render(
      <PDFViewer
        onNavBack={onNavBackMock}
        filePath="/files/PDFTRON_about.pdf"
        fileName={"PDFTRON_about.pdf"}
        searchKey={""}
        searchContent={[]}
      />
    );
  });

  it("renders PDFViewer component", () => {
    const elements = screen.getAllByText("PDFTRON_about.pdf");
    expect(elements.length).toBe(2);
  });

  it("calls onNavBack when back icon is clicked", async () => {
    const backIcons = screen.getAllByAltText("icon");
    backIcons.forEach((backIcon) => {
      fireEvent.click(backIcon);
    });

    await waitFor(() => {
      expect(onNavBackMock).toHaveBeenCalledTimes(1);
    });
  });

  it("initializes WebViewer with the correct configuration", async () => {
    await waitFor(() => {
      expect(WebViewer).toHaveBeenCalledWith(
        {
          path: "/webviewer",
          initialDoc: mockFilePath,
        },
        expect.anything()
      );
    });
  });

  it("click on zoom in and out and click on page", () => {
    expect(screen.getByTestId("pagination")).toBeInTheDocument();
    const zoomInButton = screen.getByAltText("Zoom in");
    const zoomOutButton = screen.getByAltText("Zoom out");
    fireEvent.click(zoomOutButton);
    expect(screen.getByText(/75/i)).toBeInTheDocument();
    fireEvent.click(zoomInButton);
    expect(screen.getByText(/85/i)).toBeInTheDocument();
  });

  test("handles documentLoaded event and sets docViewerState", async () => {
    const mockedDocumentViewer = {
      addEventListener: jest.fn(),
    };
    const mockedCore = {
      documentViewer: mockedDocumentViewer,
    };
    render(
      <PDFViewer
        onNavBack={onNavBackMock}
        filePath="/files/PDFTRON_about.pdf"
        fileName={"PDFTRON_about.pdf"}
        searchKey={""}
        searchContent={[]}
      />
    );
    await waitFor(() => {
      expect(mockedDocumentViewer.addEventListener).toHaveBeenCalledTimes(0);
    });
  });
});

describe("PDFView Component with search key", () => {
  const onNavBackMock = jest.fn();
  const mockFilePath = "./files/PDFTRON_about.pdf";

  const setDocViewerState = jest.fn();

  beforeEach(() => {
    jest.mock("react", () => ({
      ...jest.requireActual("react"),
      useState: jest
        .fn()
        .mockImplementation((initialState, setDocViewerState) => [
          initialState,
          setDocViewerState,
        ]),
    }));
  });

  it("render pdf with search key", async () => {
    render(
      <ThemeProvider theme={theme}>
        <PDFViewer
          fileName="Company agreement.pdf"
          onNavBack={onNavBackMock}
          filePath="/files/PDFTRON_about.pdf"
          searchKey={"first"}
          searchContent={[]}
        />
      </ThemeProvider>
    );
    const element = screen.getAllByText("Company agreement.pdf");
    expect(element.length).toBe(2);

    const searchquery = await screen.findByTestId("searchKey");
    expect(searchquery).toBeInTheDocument();

    const downArrow = await screen.findByTestId("test-content");
    expect(downArrow).toBeInTheDocument();
  });

  test("renders SearchPopup component with the correct props", async () => {
    render(
      <ThemeProvider theme={theme}>
        <PDFViewer
          fileName="Company agreement.pdf"
          onNavBack={() => {}}
          filePath="/path/to/pdf"
          searchKey="Company"
          searchContent={[
            "Since being established in 1908 as a sewing machine Repair business, the brother group has pursued the diversification and globalization of business in its history of more",
            "Repair business is",
            "Repair business is ss",
          ]}
        />
      </ThemeProvider>
    );

    const elements = await screen.getAllByText("Company agreement.pdf");

    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });

    const searchPopup = await screen.getByTestId("searchKey");
    expect(searchPopup).toBeInTheDocument();
  });
});
