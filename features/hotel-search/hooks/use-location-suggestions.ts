"use client";

import { useQuery } from "@tanstack/react-query";
import { getLocationSuggestions } from "../api/get-location-suggestions";
import { useDebounce } from "@/shared/hooks/use-debounce";

export function useLocationSuggestions(searchText: string) {
  const debouncedSearchText = useDebounce(searchText, 400);

  return useQuery({
    queryKey: ["location-suggestions", debouncedSearchText],
    queryFn: () => getLocationSuggestions(debouncedSearchText),
    enabled: debouncedSearchText.trim().length >= 2,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
