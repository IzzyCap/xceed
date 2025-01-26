import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import EventSection from "./EventSection";

describe("EventSection", () => {
  const events = [
    {
      id: "1",
      name: "Test Event",
      coverUrl: "test-cover-url",
      startingTime: 1620000000,
      endingTime: 1620000200,
      legacyId: 1,
      slug: "test-event",
      venue: {
        city: {
          coverUrl: "test-cover-url",
          currency: "test-currency",
          id: "2",
          legacyId: 2,
          name: "Test City",
          slug: "test-city",
          timezone: "test-timezone",
        },
        coordinates: {
          latitude: 1,
          longitude: 1,
        },
        coverUrl: "test-cover-url",
        id: "2",
        legacyId: 2,
        name: "Test Venue",
        slug: "test-venue",
      },
    },
    {
      id: "2",
      name: "Test Event-2",
      coverUrl: "test-cover-url-2",
      startingTime: 1686952740,
      endingTime: 1686974400,
      legacyId: 1,
      slug: "test-event",
      venue: {
        city: {
          coverUrl: "test-cover-url-2",
          currency: "test-currency-2",
          id: "3",
          legacyId: 3,
          name: "Test City 2",
          slug: "test-city-2",
          timezone: "test-timezone-2",
        },
        coordinates: {
          latitude: 2,
          longitude: 2,
        },
        coverUrl: "test-cover-url-2",
        id: "3",
        legacyId: 3,
        name: "Test Venue 3",
        slug: "test-venue-3",
      },
    },
  ];
  it("should render", () => {
    render(
      <EventSection
        title="test-title"
        events={{ pages: [events], pageParams: [] }}
        hasNextPage={false}
        onButtonClick={vi.fn()}
        onEventClick={vi.fn()}
        button={{ position: "header", text: "test-button-text" }}
      />
    );
    expect(screen.getByText("test-title")).toBeInTheDocument();
  });
  it("should render the text button if there are more pages", () => {
    render(
      <EventSection
        title="test-title"
        events={{ pages: [events, events], pageParams: [] }}
        hasNextPage={true}
        onButtonClick={vi.fn()}
        onEventClick={vi.fn()}
        button={{ position: "header", text: "test-button-text" }}
      />
    );
    expect(screen.getByText("test-button-text")).toBeInTheDocument();
  });
  it("should render only one column of events", () => {
    render(
      <EventSection
        title="test-title"
        events={{ pages: [events], pageParams: [] }}
        hasNextPage={false}
        onButtonClick={vi.fn()}
        onEventClick={vi.fn()}
        button={{ position: "header", text: "test-button-text" }}
        columns={1}
      />
    );
    expect(screen.getByTestId("columns")).toHaveClass("grid-cols-1");
    expect(screen.getByTestId("columns")).not.toHaveClass("gap-7");
    expect(screen.getByTestId("columns")).not.toHaveClass("md:grid-cols-2");
  });
  it("should render two columns of events", () => {
    render(
      <EventSection
        title="test-title"
        events={{ pages: [events], pageParams: [] }}
        hasNextPage={false}
        onButtonClick={vi.fn()}
        onEventClick={vi.fn()}
        button={{ position: "header", text: "test-button-text" }}
        columns={2}
      />
    );
    expect(screen.getByTestId("columns")).toHaveClass("gap-7");
    expect(screen.getByTestId("columns")).toHaveClass("md:grid-cols-2");
  });
  it("should click on the button", () => {
    const onClick = vi.fn();
    render(
      <EventSection
        title="test-title"
        events={{ pages: [events, events], pageParams: [] }}
        hasNextPage={true}
        onButtonClick={onClick}
        onEventClick={vi.fn()}
        button={{ position: "header", text: "test-button-text" }}
      />
    );
    screen.getByText("test-button-text").click();
    expect(onClick).toHaveBeenCalled();
  })
});
