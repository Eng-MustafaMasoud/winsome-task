import type { Hotel } from "../types/hotel.types";

export type GetHotelsParams = {
  pageParam?: number;
  limit?: number;
  location?: string;
};

export type HotelsResponse = {
  data: Hotel[];
  nextPage: number | null;
  total: number;
};

export async function getHotels({
  pageParam = 1,
  limit = 20,
  location,
}: GetHotelsParams): Promise<HotelsResponse> {
  const params = new URLSearchParams();

  params.set("_page", String(pageParam));
  params.set("_limit", String(limit));

  if (location?.trim()) {
    params.set("location_like", location.trim());
  }

  const response = await fetch(
    `http://localhost:4000/hotels?${params.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch hotels: ${response.status}`);
  }

  const totalCount = Number(response.headers.get("X-Total-Count") || 0);
  const hotels: Hotel[] = await response.json();

  const loadedSoFar = pageParam * limit;
  const nextPage = loadedSoFar < totalCount ? pageParam + 1 : null;

  return {
    data: hotels,
    nextPage,
    total: totalCount,
  };
}
