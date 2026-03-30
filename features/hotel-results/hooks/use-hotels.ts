"use client";

import { useQuery } from "@tanstack/react-query";
import { getHotels } from "../api/get-hotels";

export function useHotels() {
  return useQuery({
    queryKey: ["hotels"],
    queryFn: getHotels,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
}
