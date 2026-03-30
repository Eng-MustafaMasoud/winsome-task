import { fetchJson } from "@/shared/api/fetch-json";
import { MOCK_API_BASE_URL } from "@/shared/constants/api";
import type { Hotel } from "../types/hotel.types";

export async function getHotelById(id: string): Promise<Hotel> {
  const allHotels = await fetchJson<Hotel[]>(MOCK_API_BASE_URL);

  if (!Array.isArray(allHotels)) {
    throw new Error("Hotel details API did not return an array");
  }

  const hotel = allHotels.find((item) => String(item.id) === String(id));

  if (!hotel) {
    throw new Error("Hotel not found");
  }

  return hotel;
}
