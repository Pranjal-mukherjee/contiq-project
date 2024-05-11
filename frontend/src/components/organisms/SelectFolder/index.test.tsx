import React from "react";
import SelectFolder from "./index";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SYNC_BUTTON } from "@src/utils/constants";
import {
  uploadFileFromDrive,
} from "@src/services/FileService";
import { addNotification } from "@src/services/NotificationService";
const mockFilesData = 
  {
    fileId: "1",
    fileName: "company.pdf",
    fileType: "pdf",
    filePath: "",
    userId: 1,
  }

jest.mock("axios");

jest.mock("../../../services/FileService", () => ({
  uploadFileFromDrive: jest.fn((fileId, fileName, filePath, fileType, userId) => {
    return { fileId, fileName, filePath, fileType, userId };
  }),
}));

jest.mock("../../../services/NotificationService", () => ({
  addNotification: jest.fn(() => Promise.resolve(true)),
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
const folderData = [
  { id: "1", name: "Zemoso Decks" },
  { id: "2", name: "Sample Data(1)" },
  { id: "3", name: "Sample Data(2)" },
];
const fileData = [{ id: "1", name: "company.pdf", parents: ["1"] }];
test("renders SelectFolder component with default props", () => {
  render(
    <SelectFolder
      folderData={folderData}
      fileData={fileData}
      callBackFromParent={() => {}}
    />
  );
  const container = screen.getByTestId("test-container");
  expect(container).toBeInTheDocument();
});

test("handles folder click and upload files", async () => {
  const userData = { id: 1, name: "John" };
  localStorage.setItem("user", JSON.stringify(userData));
  render(
    <SelectFolder
      folderData={folderData}
      fileData={fileData}
      callBackFromParent={() => {}}
      refetchData={() => {}}
    />
  );
  const folderButton = screen.getAllByTestId("listItemButton");
  fireEvent.click(folderButton[0]);
  const title = screen.getByText("Zemoso Decks");
  expect(title).toBeInTheDocument();
  const checkbox = screen.getByText("company.pdf");
  const check = screen.getAllByRole("checkbox");
  fireEvent.click(check[0]);
  const button = screen.getAllByRole("button");

  expect(button[2]).toBeDisabled;
  expect(checkbox).toBeDefined();
  fireEvent.click(check[0]);
  expect(checkbox).toBeDefined();
  expect(button[2]).toBeEnabled;
  const closeButton = screen.getAllByRole("img");

  fireEvent.click(closeButton[0]);
  const title1 = screen.getByText("Choose the folders to sync with contiq");
  expect(title1).toBeInTheDocument();
  const syncButton = screen.getByRole("button", { name: SYNC_BUTTON });
  fireEvent.click(syncButton);
  await waitFor(() => {
    expect(uploadFileFromDrive).toHaveBeenCalledWith(
      mockFilesData
    );
    expect(addNotification).toHaveBeenCalledWith(
      "John",
      "uploaded",
      "company.pdf",
      1
    );
  });
});
test("handles back button click", () => {
  const folderData = [{ name: "Folder1" }, { name: "Folder2" }];
  render(
    <SelectFolder
      folderData={folderData}
      fileData={[]}
      callBackFromParent={() => {}}
    />
  );
  const backButton = screen.getByText("Back");
  fireEvent.click(backButton);
  const title = screen.getByText("Choose the folders to sync with contiq");
  expect(title).toBeInTheDocument();
});
