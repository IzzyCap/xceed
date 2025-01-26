import { QueryKeys } from "@/views/Artist/typings";
import { Event } from "@/hooks/useGetEvent/typings";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosInstance } from "axios";

export default function useGetEvent({httpClient = axios, eventId}: {httpClient?: AxiosInstance, eventId?: string | null,}) {
  return useQuery<Event>({
    queryKey: [QueryKeys.EVENT, eventId],
    queryFn: async () => {
      const { data } = await httpClient.get(`https://events.staging.xceed.me/v1/events/${eventId}`);
      return data.data;
    },
    onError: (error) => {
      // Handle error and display appropriate message
      console.error(error)
    },
    enabled: !!eventId
  });
}
