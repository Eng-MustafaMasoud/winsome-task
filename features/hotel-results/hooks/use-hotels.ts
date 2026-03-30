"use client";

import { useQuery } from "@tanstack/react-query";
import { getHotelsList } from "../api/get-hotels-list";

export function useHotels(location?: string) {
  return useQuery({
    queryKey: ["hotels", "list", location ?? ""],
    queryFn: () => getHotelsList(location),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
}
