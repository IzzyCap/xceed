import classNames from "classnames";

import { InfiniteData } from "@tanstack/react-query";
import EventItem from "@/components/EventItem";
import { EventListItem } from "@/hooks/useGetEvents/typings";

interface EventSectionProps {
  title: string;
  events: InfiniteData<EventListItem[]> | undefined;
  hasNextPage: boolean | undefined;
  onButtonClick: () => void;
  onEventClick: (eventId: EventListItem["id"]) => void;
  columns?: number;
  button: {
    position: "header" | "footer";
    text: string;
  };
}

interface MoreButtonProps {
  text: string;
  onButtonClick: () => void;
}

const MoreButton = ({ text, onButtonClick }: MoreButtonProps) => (
  <button
    className="text-base text-babyBlue font-avenirHeavy"
    onClick={onButtonClick}
  >
    {text}
  </button>
);

const EventSection = ({
  title,
  events,
  hasNextPage,
  onButtonClick,
  onEventClick,
  button,
  columns = 1,
}: EventSectionProps) => {
  const columnClasses = classNames(
    "grid",
    "grid-cols-1",
    { [`md:grid-cols-2`]: columns > 1 },
    columns > 1 && "gap-7"
  );

  const handleEventClick = (eventId: EventListItem["id"]) => {
    onEventClick(eventId);
  };

  const handleButtonClick = () => {
    onButtonClick();
  };

  return (
    <section>
      <header className="flex items-center mt-14 place-content-between">
        <h2 className="text-2xl font-black">{title}</h2>
        {hasNextPage && button.position === "header" && (
          <MoreButton text={button.text} onButtonClick={handleButtonClick} />
        )}
      </header>
      <div className={columnClasses} data-testid="columns">
        {events?.pages.map((page) =>
          page.map((event) => (
            <EventItem
              key={`event-${event.id}`}
              event={event}
              onClick={(eventId: EventListItem["id"]) => handleEventClick(eventId)}
            />
          ))
        )}
      </div>
      {hasNextPage && button.position === "footer" && (
        <footer className="mt-2">
          <MoreButton text={button.text} onButtonClick={handleButtonClick} />
        </footer>
      )}
    </section>
  );
};

export default EventSection;
