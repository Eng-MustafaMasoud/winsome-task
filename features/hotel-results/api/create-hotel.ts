import type { CreateHotelPayload, Hotel } from "../types/hotel.types";

export async function createHotel(payload: CreateHotelPayload): Promise<Hotel> {
  const response = await fetch("http://localhost:4000/hotels", {
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
