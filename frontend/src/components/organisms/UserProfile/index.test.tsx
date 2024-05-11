import { fireEvent, render, screen } from "@testing-library/react";
import UserProfileDropdown from "./";
import { useAuth0 } from "@auth0/auth0-react";
const mockProps = {
  avatar: "path-to-avatar",
  userId: "user123",
  userName: "John Doe",
};
jest.mock("@auth0/auth0-react", () => ({
  useAuth0: jest.fn(),
}));

jest.mock("axios");

const logoutMock = jest.fn();
(useAuth0 as jest.Mock).mockReturnValue({
  logout: logoutMock,
});
test("UserProfileDropdown renders correctly and opens the menu", () => {
  render(<UserProfileDropdown {...mockProps} />);

  const avatar = screen.getByRole("button");
  fireEvent.click(avatar);
  expect(avatar).toBeInTheDocument();
  const profileMenuItem = screen.getByText(/profile/i);
  const settingsMenuItem = screen.getByText(/settings/i);
  const logoutMenuItem = screen.getByText(/logout/i);

  expect(profileMenuItem).toBeInTheDocument();
  expect(settingsMenuItem).toBeInTheDocument();
  expect(logoutMenuItem).toBeInTheDocument();
  fireEvent.click(logoutMenuItem);
  expect(logoutMock).toHaveBeenCalledWith({
    logoutParams: { returnTo: "https://fe-bc138.bootcamp64.tk/" },
  });
});
