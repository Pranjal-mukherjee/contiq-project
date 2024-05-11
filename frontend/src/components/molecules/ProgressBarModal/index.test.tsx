import React from "react";
import { render, screen } from "@testing-library/react";
import ProgressBarModal from ".";

describe("ProgressBarModal", () => {
  it("should not render the closeButton for loader variant", () => {
    render(<ProgressBarModal fileName="example.pdf" open={true} />);

    expect(screen.queryByRole("img", { name: "Close" })).toBeNull();
  });
});
describe("ProgressBarModal", () => {
  it("should not render ", () => {
    render(<ProgressBarModal fileName="example.pdf" open={false} />);

    const syncModal = screen.queryByTestId("sync-modal");
    expect(syncModal).toBeNull();
  });
});
