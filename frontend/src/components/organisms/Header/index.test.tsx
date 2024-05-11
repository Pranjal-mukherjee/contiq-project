import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HeaderBar from ".";
import { debounce } from "lodash";
import { fetchFilesBySearch } from "@src/services/FileService";
const mockNotificationData = [
  {
    id: "1",
    created_at: "21-12-2023 10:45",
    notification_message: "Pranjal has uploaded project_proposal.docx",
    is_read: false,
    user_id: 2,
  },
  {
    id: "2",
    created_at: "21-12-2023 10:45",
    notification_message: "Pranjal has uploaded project_proposal.docx",
    is_read: false,
    user_id: 2,
  },
];

jest.mock("axios");
jest.mock("lodash/debounce");
jest.useFakeTimers();
jest.mock("@src/services/NotificationService", () => ({
  fetchNotifications: jest.fn(() => Promise.resolve(mockNotificationData)),
}));
jest.mock("@src/services/FileService", () => ({
  fetchFilesBySearch: jest.fn(() => Promise.resolve("some")),
}));
jest.mock("@src/services/UserService", () => ({
  updateNotificationsOnClick: jest.fn((id, length) => {
    if (length === 3) {
      return Promise.resolve({ data: [3] });
    } else {
      return Promise.reject(new Error("Something went wrong"));
    }
  }),
}));

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

test("Test - Notification", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <HeaderBar userName={"Pranjal"} userId={"1"} />
      </BrowserRouter>
    );
  });

  expect(screen.getByTestId("test-header")).toBeInTheDocument();
  const input = screen.getByPlaceholderText("Search");
  expect(input).toBeInTheDocument();
  await act(async () => {
    fireEvent.change(input, { target: { value: "some" } });
  });

  const notificationModal1 = screen.queryByTestId("test-notification");
  expect(notificationModal1).not.toBeInTheDocument();

  const notificationIcon = screen.getByAltText("notification.svg");

  act(() => {
    fireEvent.click(notificationIcon);
  });
});
