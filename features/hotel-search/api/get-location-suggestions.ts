import type { LocationOption } from "../types/hotel-search.types";

const STATIC_LOCATIONS: LocationOption[] = [
  { label: "Cairo, Egypt", value: "Cairo, Egypt" },
  { label: "Giza, Egypt", value: "Giza, Egypt" },
  { label: "Sharm El Sheikh, Egypt", value: "Sharm El Sheikh, Egypt" },
  { label: "Hurghada, Egypt", value: "Hurghada, Egypt" },
  { label: "Alexandria, Egypt", value: "Alexandria, Egypt" },
  { label: "Luxor, Egypt", value: "Luxor, Egypt" },
  { label: "Aswan, Egypt", value: "Aswan, Egypt" },
  { label: "Marsa Alam, Egypt", value: "Marsa Alam, Egypt" },
  { label: "El Gouna, Egypt", value: "El Gouna, Egypt" },
  { label: "Ain Sokhna, Egypt", value: "Ain Sokhna, Egypt" },
];

export async function getLocationSuggestions(
  query: string,
): Promise<LocationOption[]> {
  const trimmed = query.trim().toLowerCase();

  if (!trimmed) {
    return STATIC_LOCATIONS;
  }

  return STATIC_LOCATIONS.filter((item) =>
    item.label.toLowerCase().includes(trimmed),
  );
}
