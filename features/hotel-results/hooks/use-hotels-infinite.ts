"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getHotelsPaginated } from "../api/get-hotels-paginated";

type Params = {
  location?: string;
  limit?: number;
};

export function useHotelsInfinite({ location, limit = 20 }: Params) {
  return useInfiniteQuery({
    queryKey: ["hotels", "infinite", location ?? "", limit],
    queryFn: ({ pageParam }) =>
      getHotelsPaginated({
        page: pageParam,
        limit,
        location,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
}
