"use client";

import { useQuery } from "@tanstack/react-query";
import { getHotelById } from "../api/get-hotel-by-id";

export function useHotelById(id: string) {
  return useQuery({
    queryKey: ["hotel", id],
    queryFn: () => getHotelById(id),
    enabled: Boolean(id),
    staleTime: 1000 * 60,
  });
}
