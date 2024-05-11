import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import MuiTabs from "./index";

describe("Testing the Mui tabs", () => {
  test("should renders MuiTabs component with default props", () => {
    const mockOnSelectTab = jest.fn();

    render(
      <MuiTabs
        tabNames={["All files", "Slides", "Docs"]}
        onSelectTab={mockOnSelectTab}
        variant={"standard"}
        handleChange={() => {}}
        selectIndex={0}
      />
    );

    const tab1 = screen.getByText("All files");
    const tab2 = screen.getByText("Slides");
    const tab3 = screen.getByText("Docs");

    expect(tab1).toBeInTheDocument();
    expect(tab2).toBeInTheDocument();
    expect(tab3).toBeInTheDocument();

    const tabs = screen.getByRole("tablist");
    expect(tabs).toBeInTheDocument();

    fireEvent.click(tab2);
    fireEvent.click(tab3);
  });
});
