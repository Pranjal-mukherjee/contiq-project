import { fireEvent, render,screen } from "@testing-library/react";
import SearchPopup from ".";
const searchKey= "Repair business"
const searchContent= [
  "Since being established in 1908 as a sewing machine Repair business, the brother group has pursued the diversification and globalization of business in its history of more",
  "Repair buisnesss is",
  "Repair business is ss",
]
const pdfName= "Company Agreement"
test("renders Copy component with default props", () => {
    render(
      <SearchPopup searchContent={searchContent} searchKey={searchKey} pdfName={pdfName} />
    );
    const container = screen.getByTestId("test-container");
    expect(container).toBeInTheDocument();
    const miniIcon = screen.getByTestId("test-minimize");
    expect(miniIcon).toBeInTheDocument();
    const content = screen.getByTestId("test-content");
    expect(content).toBeInTheDocument();
    fireEvent.click(miniIcon);
    expect(content).not.toBeInTheDocument();
    const maxiIcon = screen.getByTestId("test-maximize");
    expect(maxiIcon).toBeInTheDocument();
    fireEvent.click(maxiIcon);
    const copyIcon = screen.getByTestId("test-copy");
    expect(copyIcon).toBeInTheDocument();
    fireEvent.click(copyIcon);
    screen.debug()
    expect(screen.getByTestId("show-copy")).toBeInTheDocument();
    setTimeout(()=>{
        expect(screen.getByTestId("show-copy")).not.toBeInTheDocument();
    },4000)
    
    const downArrow = screen.getByTestId("test-down")
    expect(downArrow).toBeInTheDocument();
    fireEvent.click(downArrow);
    const upArrow = screen.getByTestId("test-up");
    expect(upArrow).toBeInTheDocument();
    fireEvent.click(upArrow)
  });