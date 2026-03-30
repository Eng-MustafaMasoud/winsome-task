"use client";

import { useQuery } from "@tanstack/react-query";
import { getLocationSuggestions } from "../api/get-location-suggestions";

export function useLocationSuggestions(searchText: string) {
  return useQuery({
    queryKey: ["location-suggestions", searchText],
    queryFn: () => getLocationSuggestions(searchText),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}
