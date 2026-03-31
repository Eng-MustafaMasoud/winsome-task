import type { CreateHotelPayload, Hotel } from "../types/hotel.types";
import { MOCK_API_BASE_URL } from "@/shared/constants/api";

export async function createHotel(payload: CreateHotelPayload): Promise<Hotel> {
  const response = await fetch(MOCK_API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Failed to create hotel: ${response.status}`);
  }

  return response.json();
}
