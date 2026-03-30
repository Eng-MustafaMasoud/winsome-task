"use client";

import { Typography } from "antd";
import { useHotels } from "@/features/hotel-results/hooks/use-hotels";
import DestinationHotelSection from "./destination-hotel-section";

const sections = [
  { title: "Recommended in Cairo", location: "Cairo, Egypt" },
  { title: "Recommended in Giza", location: "Giza, Egypt" },
  {
    title: "Recommended in Sharm El Sheikh",
    location: "Sharm El Sheikh, Egypt",
  },
];

export default function SuggestedHotelsSections() {
  const { data: hotels = [], isLoading } = useHotels();
  console.log(hotels);
  return (
    <section style={{ padding: "48px 24px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 32 }}>
          <Typography.Title level={2} style={{ marginBottom: 8 }}>
            Popular destinations
          </Typography.Title>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            Discover hotel recommendations across top destinations.
          </Typography.Paragraph>
        </div>

        {sections.map((section) => {
          const allInCity = hotels.filter(
            (hotel) => hotel.location === section.location,
          );
          const cityHotels = allInCity.slice(0, 4);

          return (
            <div key={section.location} style={{ marginBottom: 48 }}>
              <DestinationHotelSection
                title={section.title}
                location={section.location}
                hotels={cityHotels}
                totalCount={allInCity.length}
                isLoading={isLoading}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
