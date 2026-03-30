import { fetchJson } from "@/shared/api/fetch-json";
import { MOCK_API_BASE_URL } from "@/shared/constants/api";
import type { Hotel } from "../types/hotel.types";

export type GetHotelsPaginatedParams = {
  page?: number;
  limit?: number;
  location?: string;
};

export type HotelsPaginatedResponse = {
  data: Hotel[];
  nextPage: number | null;
  total: number;
};

export async function getHotelsPaginated({
  page = 1,
  limit = 20,
  location,
}: GetHotelsPaginatedParams): Promise<HotelsPaginatedResponse> {
  const allHotels = await fetchJson<Hotel[]>(MOCK_API_BASE_URL);

  if (!Array.isArray(allHotels)) {
    throw new Error("Hotels paginated API did not return an array");
  }

  let filteredHotels = allHotels;

  if (location?.trim()) {
    const normalizedLocation = location.trim().toLowerCase();
    filteredHotels = filteredHotels.filter((hotel) =>
      hotel.location.toLowerCase().includes(normalizedLocation),
    );
  }

  const total = filteredHotels.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedHotels = filteredHotels.slice(start, end);
  const nextPage = end < total ? page + 1 : null;

  return {
    data: paginatedHotels,
    nextPage,
    total,
  };
}
