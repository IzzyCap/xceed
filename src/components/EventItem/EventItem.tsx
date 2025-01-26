import { days } from "@/data/days";
import { EventListItem } from "@/hooks/useGetEvents/typings";

export default function EventItem({ event, onClick }: { event: EventListItem, onClick: (eventId: EventListItem['id']) => void }) {
  const eventDate = new Date(event.startingTime * 1000);
  const weekDay = eventDate.getDay();
  const month = eventDate.toLocaleString("default", {
    month: "short",
  });

  return (
    <article
      key={event.id}
      onClick={() => onClick(event.id)}
      className="my-3 flex gap-5 items-center b-red rounded-2xl shadow-custom cursor-pointer overflow-hidden"
    >
      <div className="relative aspect-square rounded-2xl w-20 h-20">
        <img
          className="rounded-2xl object-cover brightness-75 h-full"
          src={event.coverUrl}
          alt={`event ${event.name} photo`}
        />
        <div className="absolute bg-black/30 inset-0 rounded-2xl"></div>
        <div className="absolute text-white inset-0 flex flex-col justify-center items-center">
          <div className="text-3xl font-black">
            {days[weekDay].charAt(0) + eventDate.getDate()}
          </div>
          <div className="text-sm font-black tracking-widest">
            {month.toUpperCase()}
          </div>
        </div>
      </div>
      <div className="grow whitespace-nowrap overflow-hidden pr-2">
        <p
          className="text-lg font-black text-grayDark whitespace-nowrap overflow-ellipsis overflow-hidden"
          title={event.name}
        >
          {event.name}
        </p>
        <p className="text-base text-grayDark">{event.venue.city.name}</p>
      </div>
    </article>
  );
}
