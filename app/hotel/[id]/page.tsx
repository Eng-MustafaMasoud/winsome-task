import HotelDetails from "@/features/hotel-results/components/hotel-details";

export default async function HotelDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <HotelDetails hotelId={id} />;
}
