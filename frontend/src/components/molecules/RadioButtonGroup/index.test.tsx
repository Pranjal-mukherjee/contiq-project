import React from "react";
import RadioButtonGroup from "./index";
import { render, screen } from "@testing-library/react";

describe("Testing the RadioButtonGroup", () => {
  test("RadioButtonGroup", () => {
    render(<RadioButtonGroup />);
    const Test = screen.getByTestId("radio-btn-grp");
    expect(Test).toBeInTheDocument();
  });
});
