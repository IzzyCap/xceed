import { QueryKeys } from "@/views/Artist/typings";
import { EventListItem } from "./typings";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios, { AxiosInstance } from "axios";
import { Params, paramsSerializer } from "@/utils/format-params";

interface GetEventsParams {
  orderBy?: string,
  sort?: string,
  startTime?: number,
  endTime?: number,
  limit?: number,
  artists?: string,
  queryKey: QueryKeys
}

export default function useGetEvents({httpClient = axios, params: {
  orderBy = 'date',
  sort = 'ASC',
  startTime,
  endTime,
  limit = 5,
  artists,
  queryKey
}}: {httpClient?: AxiosInstance, params: GetEventsParams}) {
  return useInfiniteQuery<EventListItem[]>(
    [queryKey],
    async ({ pageParam = 0 }) => {
      const queryParams = paramsSerializer({ orderBy, sort, startTime, endTime, limit, artists, offset: pageParam } as Params);
      const { data } = await httpClient.get(
        `https://events.staging.xceed.me/v1/events?${queryParams}`
      );
      return data.data;
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === limit ? allPages.length * limit : undefined;
      },
      onError: (error) => {
        // Handle error and display appropriate message
        console.error(error)
      },
      enabled: !!artists
    }
  );
}
