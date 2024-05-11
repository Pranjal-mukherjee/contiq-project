import { render, screen } from "@testing-library/react";
import React from "react";
import FolderCard from ".";
import "@testing-library/jest-dom";

test("render folder variant", () => {
  const element = render(<FolderCard name="Zemoso decks" isFile={false} onChangeFiles={()=>{}} />);
  expect(element).toBeDefined();
  expect(screen.queryByText("Zemoso decks")).toBeInTheDocument();
});
test("render file variant", () => {
  const element = render(
    <FolderCard name="Company overview" isFile={true} onChangeFiles={()=>{}}/>
  );
  expect(element).toBeDefined();
  expect(screen.getByRole("checkbox")).toBeInTheDocument();
});
