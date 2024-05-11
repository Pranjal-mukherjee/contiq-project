import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import DropDown from '.';
import { PUBLISH_ITEM1, PUBLISH_ITEM2, PUBLISH_ITEM3, PUBLISH_LABEL, PUBLISH_PLACEHOLDER } from '@src/utils/constants';
const placeholder= PUBLISH_PLACEHOLDER
    const label= PUBLISH_LABEL
    const menuItems= [
       PUBLISH_ITEM1,
       PUBLISH_ITEM2,
       PUBLISH_ITEM3
    ]
describe('DropDown', () => {
  test('renders without errors', () => {
    render(
      <DropDown
        menuItems={menuItems}
        placeholder={placeholder}
        label={label}
      />
    );
  });

  test('updates the value when an item is selected', () => {
    const {  getByText, getByAltText } = render(
      <DropDown
        menuItems={menuItems}
        placeholder={placeholder}
        label={label}
      />
    );
    const selectButton = screen.getByRole("combobox");
    fireEvent.mouseDown(selectButton);

    const item1 = getByText(PUBLISH_ITEM1);
    fireEvent.click(item1);

    expect(selectButton.textContent).toBe(PUBLISH_ITEM1);
    const closeIcon = getByAltText('not found close image');
    expect(closeIcon).toBeInTheDocument();
    fireEvent.click(closeIcon);
  });
});
