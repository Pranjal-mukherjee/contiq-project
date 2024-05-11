import { act, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from ".";
const mockFilesData = [
  {
    id: 1,
    name: "contiq1.pdf",
    type: "pdf",
    path: "./files",
    uploaded_at: "23-12-23",
    user_id: 2,
  },
];
jest.mock("axios");

jest.mock("@src/services/FileService", () => ({
  fetchFilesByUserId: jest.fn(() => Promise.resolve(mockFilesData)),
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

test("Test Home Page", async () => {
  const userData = { id: 1, name: "John" };
  localStorage.setItem("user", JSON.stringify(userData));

  await act(async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
  });
  expect(screen.getByTestId("test-home")).toBeInTheDocument();
});
