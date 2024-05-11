import React from "react"
import { render,screen } from "@testing-library/react"
import IconComponent from "./index"
import Home from '../../../../public/assets/icons/Home.svg'

describe("to test the Icon Component", () => {
it('should render icon',()=>{
    render(<IconComponent src={Home} height="20.02px" width="18px" padding="10px"/>)
    const icon = screen.getByTestId("iconComponent")
    expect(icon).toBeDefined()
})});
describe("IconComponent", () => {
    it("should display the icon with the specified width and height", () => {
      render(
        <IconComponent
          src={Home}
          width="18px"
          height="20.02px"
          padding="10px"
        />
      );
  
      const icon = screen.getByTestId("iconComponent");

      icon.setAttribute("src", "/path/to/icon.svg");
      expect(icon).toHaveAttribute("width", "18px");
      expect(icon).toHaveAttribute("height", "20.02px");
      icon.setAttribute("padding", "10px");
    });
});