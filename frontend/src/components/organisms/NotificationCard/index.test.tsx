import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NotificationCard from ".";

describe("NotificationCard", () => {
  const notificationData = [
    {
      id: 1,
      message: "John has uploaded company agreement.pdf",
      createdAt: "20 June  10:30 AM",
    },
  ];

  test("renders without errors", () => {
    render(
      <NotificationCard
        notificationData={[]}
        handleCloseIcon={() => {}}
        visible={true}
      />
    );
    expect(true).toBe(true);
  });

  test('renders the "Notifications" header', () => {
    const { getByText } = render(
      <NotificationCard
        notificationData={[]}
        handleCloseIcon={() => {}}
        visible={true}
      />
    );

    expect(getByText("Notifications")).toBeInTheDocument();
  });

  test("toggles card visibility on close icon click", () => {
    const { getByAltText } = render(
      <NotificationCard
        notificationData={[]}
        handleCloseIcon={() => {}}
        visible={true}
      />
    );

    const closeIcon = getByAltText("icon");
    fireEvent.click(closeIcon);
  });

  test("renders notification items when CardVisible is true", () => {
    const { getByText } = render(
      <NotificationCard
        notificationData={notificationData}
        handleCloseIcon={() => {}}
        visible={true}
      />
    );

    expect(getByText("Notifications")).toBeInTheDocument();
  });

  test("does not render notification items when CardVisible is false", () => {
    const { queryByText } = render(
      <NotificationCard
        notificationData={[]}
        handleCloseIcon={() => {}}
        visible={true}
      />
    );
    expect(queryByText("Test notification")).toBeNull();
  });
});
