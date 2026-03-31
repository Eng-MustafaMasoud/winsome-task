import type { Hotel } from "../types/hotel.types";
import { fetchJson } from "@/shared/api/fetch-json";
import { MOCK_API_BASE_URL } from "@/shared/constants/api";

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
  const allHotels = await fetchJson<Hotel[]>(MOCK_API_BASE_URL);

  if (!Array.isArray(allHotels)) {
    throw new Error("Hotels API did not return an array");
  }

  let filteredHotels = allHotels;
  if (location?.trim()) {
    const normalizedLocation = location.trim().toLowerCase();
    filteredHotels = filteredHotels.filter((hotel) =>
      hotel.location.toLowerCase().includes(normalizedLocation),
    );
  }

  const total = filteredHotels.length;
  const start = (pageParam - 1) * limit;
  const end = start + limit;
  const pageHotels = filteredHotels.slice(start, end);
  const nextPage = end < total ? pageParam + 1 : null;

  return { data: pageHotels, nextPage, total };
}
