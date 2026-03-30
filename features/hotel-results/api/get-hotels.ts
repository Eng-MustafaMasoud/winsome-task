import type { Hotel } from "../types/hotel.types";

export async function getHotels(): Promise<Hotel[]> {
  const response = await fetch("http://localhost:4000/hotels", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch hotels: ${response.status}`);
  }

  return response.json();
}
