import { type NextRequest } from "next/server";

import db from "../../../db.json";
import type { CreateHotelPayload, Hotel } from "@/features/hotel-results/types/hotel.types";

type DbShape = {
  hotels: Hotel[];
};

const initialHotels: Hotel[] = (db as DbShape).hotels ?? [];
// In-memory store for the life of the serverless instance.
let hotels = [...initialHotels];

function safeNumber(value: unknown): number {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

export async function GET() {
  // Return the full list; the UI does filtering/pagination client-side.
  return Response.json(hotels);
}

export async function POST(req: NextRequest) {
  const payload = (await req.json()) as CreateHotelPayload;

  const nextId =
    hotels.reduce((max, h) => Math.max(max, h.id), 0) + 1;

  const newHotel: Hotel = {
    ...payload,
    id: nextId,
    price: safeNumber(payload.price),
    rating: safeNumber(payload.rating),
    distance: payload.distance,
  };

  hotels = [newHotel, ...hotels];
  return Response.json(newHotel, { status: 201 });
}

