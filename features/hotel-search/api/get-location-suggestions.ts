import type { LocationOption } from "../types/hotel-search.types";

const MOCK_LOCATIONS: LocationOption[] = [
  { label: "Cairo, Egypt", value: "Cairo, Egypt" },
  { label: "Giza, Egypt", value: "Giza, Egypt" },
  { label: "Alexandria, Egypt", value: "Alexandria, Egypt" },
  { label: "Hurghada, Egypt", value: "Hurghada, Egypt" },
  { label: "Sharm El Sheikh, Egypt", value: "Sharm El Sheikh, Egypt" },
  { label: "Luxor, Egypt", value: "Luxor, Egypt" },
  { label: "Aswan, Egypt", value: "Aswan, Egypt" },
  { label: "Ain Sokhna, Egypt", value: "Ain Sokhna, Egypt" },
  { label: "Marsa Alam, Egypt", value: "Marsa Alam, Egypt" },
  { label: "El Gouna, Egypt", value: "El Gouna, Egypt" },
];

export async function getLocationSuggestions(
  query: string,
): Promise<LocationOption[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (!query.trim()) {
    return [];
  }

  const normalizedQuery = query.trim().toLowerCase();

  return MOCK_LOCATIONS.filter((location) =>
    location.label.toLowerCase().includes(normalizedQuery),
  );
}
