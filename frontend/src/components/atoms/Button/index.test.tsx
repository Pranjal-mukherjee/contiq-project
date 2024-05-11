import { render } from "@testing-library/react";
import MuiButton from ".";
import "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";

describe("Contained button", () => {
  test("renders correctly", () => {
    const button = render(
      <MuiButton variant="contained" text="Contained" onClick={jest.fn} />
    );
    expect(button).toBeDefined();
  });
});
