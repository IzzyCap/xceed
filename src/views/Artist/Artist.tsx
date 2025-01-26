import classNames from "classnames";
import { useContext, useEffect, useState } from "react";
import { QueryKeys } from "./typings";
import { EventListItem } from "@/hooks/useGetEvents/typings";
import useGetEvents from "@/hooks/useGetEvents/useGetEvents";
import useGetEvent from "@/hooks/useGetEvent/useGetEvent";
import XceedLogo from "@/assets/img/xceedLogo.svg";
import NavBar from "@/components/NavBar";
import HeroHeader from "@/components/HeroHeader";
import EventSection from "@/components/EventSection";
import BioSection from "@/components/BioSection";
import ModalDialog from "@/components/ModalDialog";
import dayjs from "dayjs";

import { useNavigate } from "react-router-dom";
import { ArtistContext } from "@/context/Artist";
import LoadingSpinner from "@/components/LoadingSpinner";

const Artist = () => {
  const navigate = useNavigate();
  const now = dayjs().unix();
  const [isFollowed, setIsFollowed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventSelected, setEventSelected] = useState<
    EventListItem["id"] | null
  >(null);

  const DEFAULT_ARTIST = 'deborah-de-luca';
  const containerClasses = classNames(
    "mx-[1rem]",
    "sm:mx-[7rem]",
    "lg:mx-[14.8125rem]"
  );

  const { isArtistLoading, artist, getArtistRequest } =
    useContext(ArtistContext);

  const { data: event, isFetching: isEventLoading } = useGetEvent({
    eventId: eventSelected,
  });

  const {
    data: events,
    hasNextPage: hasEventsNextPage,
    fetchNextPage: eventsFetchNextPage,
  } = useGetEvents({
    params: {
      sort: "ASC",
      artists:  artist?.id,
      queryKey: QueryKeys.EVENTS,
      startTime: now
    },
  });

  const {
    data: pastEvents,
    hasNextPage: hasPastEventsNextPage,
    fetchNextPage: pastEventsFetchNextPage,
  } = useGetEvents({
    params: {
      sort: "DESC",
      artists: artist?.id,
      limit: 2,
      queryKey: QueryKeys.PAST_EVENTS,
      endTime: now
    },
  });

  const formatDate = (date: number) => {
    return dayjs.unix(date).format("DD MMM YYYY, HH:mm");
  };

  const handleMoreEventsClick = () => {
    eventsFetchNextPage();
  };

  const handleMorePastEventsClick = () => {
    pastEventsFetchNextPage();
  };

  const handleFollowClick = () => {
    setIsFollowed(!isFollowed);
  };

  const handleEditClick = () => {
    navigate(`/edit/artist/${DEFAULT_ARTIST}`);
  };

  const handleEventClick = (eventId: EventListItem["id"]) => {
    setEventSelected(eventId);
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (DEFAULT_ARTIST && !artist && !isArtistLoading) {
      getArtistRequest(DEFAULT_ARTIST);
    }
  }, [DEFAULT_ARTIST, getArtistRequest, artist, isArtistLoading]);
  

  if (isArtistLoading || !artist)
    return (
      <>
        <NavBar>
          <XceedLogo className="h-6" />
        </NavBar>
        <div className="flex h-[calc(100vh-72px)]">
          <LoadingSpinner >Loading...</LoadingSpinner>
        </div>
      </>
    );

  return (
    <>
      <NavBar>
        <XceedLogo className="h-6" />
      </NavBar>
      <HeroHeader
        artist={artist}
        onClickFollow={handleFollowClick}
        onClickEdit={handleEditClick}
        isFollowed={isFollowed}
      />
      <section className={containerClasses}>
        <EventSection
          title="Upcoming Gigs"
          events={events}
          hasNextPage={hasEventsNextPage}
          onEventClick={handleEventClick}
          onButtonClick={handleMoreEventsClick}
          button={{
            text: "See More Upcoming Events",
            position: "footer",
          }}
        />
      </section>
      <section className="relative mt-10 py-10">
        <div className="absolute inset-0 bg-grayLight rounded-tl-[2.25rem] rounded-tr-[2.25rem]"></div>
        <div className={`${containerClasses} relative`}>
          {artist && <BioSection artist={artist} />}
          {pastEvents && (
            <EventSection
              title="Past Events"
              events={pastEvents}
              hasNextPage={hasPastEventsNextPage}
              onButtonClick={handleMorePastEventsClick}
              onEventClick={handleEventClick}
              button={{
                text: "See more past events",
                position: "header",
              }}
              columns={2}
            />
          )}
        </div>
      </section>
      <ModalDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
      >
        {isEventLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="flex flex-col md:flex-row items-stretch gap-7">
            <img
              src={event?.coverUrl}
              alt={event?.name}
              className="object-cover w-[15rem] h-[15rem] rounded-3xl"
            />
            <div className="md:ml-4 flex flex-col grow gap-7">
              <h3 className="text-2xl font-bold">{event?.name}</h3>
              <div>
                <h4 className="text-lg font-black">About the event</h4>
                <p>{event?.about}</p>
              </div>
              <div className="mt-auto">
                <h4 className="text-lg font-black">Date and time</h4>
                <p>
                  {event && formatDate(event.startingTime)} -{" "}
                  {event && formatDate(event?.endingTime)}
                </p>
              </div>
            </div>
          </div>
        )}
      </ModalDialog>
    </>
  );
};

export default Artist;
