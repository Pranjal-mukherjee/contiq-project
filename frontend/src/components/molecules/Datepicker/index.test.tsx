import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import DatePicker from "./index";
import { DAYS_OF_WEEK, START_DATE } from "../../../utils/constants";

describe("DatePicker tests", () => {
  it("should render the initial datepicker with label and ExpandMoreIcon", () => {
    render(
      <DatePicker label={START_DATE} date="" setDate={jest.fn} />
    );

    expect(screen.queryByText(START_DATE)).toBeInTheDocument();
    expect(
      screen.queryByTestId("ExpandMoreIcon")
    ).toBeInTheDocument();
  });

  it("should render calendar when ExpandMoreIcon is clicked", () => {
    render(
      <DatePicker label={START_DATE} date="" setDate={jest.fn} />
    );

    expect(
      screen.queryByText(DAYS_OF_WEEK.get("su") || "SUN")
    ).toBeNull();
    fireEvent.click(screen.getByTestId("ExpandMoreIcon"));
    expect(
      screen.queryByText(DAYS_OF_WEEK.get("su") || "SUN")
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId("ExpandLessIcon")
    ).toBeInTheDocument();
  });

  it("should render the date and the CloseIcon", () => {
    render(
      <DatePicker label={START_DATE} date="1000" setDate={jest.fn} />
    );

    expect(screen.queryByText("1000")).toBeInTheDocument();
    expect(screen.queryByTestId("CloseIcon")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("CloseIcon"));
    expect(
      screen.queryByText(DAYS_OF_WEEK.get("su") || "SUN")
    ).toBeNull();
  });

  it("should call the setDate function on changing date", () => {
    const setDatefn = jest.fn();
    render(
      <DatePicker label={START_DATE} date="" setDate={setDatefn} />
    );

    fireEvent.click(screen.getByTestId("ExpandMoreIcon"));
    expect(
      screen.queryByText(DAYS_OF_WEEK.get("su") || "SUN")
    ).toBeInTheDocument();
    fireEvent.click(screen.queryAllByText("1")[0]);
    expect(setDatefn).toBeCalledTimes(1);
  });
});
