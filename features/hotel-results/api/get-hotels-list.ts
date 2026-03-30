import { fetchJson } from "@/shared/api/fetch-json";
import { MOCK_API_BASE_URL } from "@/shared/constants/api";
import type { Hotel } from "../types/hotel.types";

export async function getHotelsList(location?: string): Promise<Hotel[]> {
  const data = await fetchJson<Hotel[]>(MOCK_API_BASE_URL);

  if (!Array.isArray(data)) {
    throw new Error("Hotels API did not return an array");
  }

  if (!location?.trim()) {
    return data;
  }

  const normalizedLocation = location.trim().toLowerCase();

  return data.filter((hotel) =>
    hotel.location.toLowerCase().includes(normalizedLocation),
  );
}
