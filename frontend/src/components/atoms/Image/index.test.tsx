import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ImageComponent from "./index";

test("renders an image with correct attributes", () => {
  render(<ImageComponent imgSrc="path/to/image.jpg" imgAlt="Alt Text" />);

  const imageElement = screen.getByTestId("image-test");
  expect(imageElement).toBeInTheDocument();
});
