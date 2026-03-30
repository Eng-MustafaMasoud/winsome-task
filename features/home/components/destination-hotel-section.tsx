"use client";

import DestinationHotelSection from "./destination-hotel-section";

const sections = [
  {
    title: "Recommended in Cairo",
    location: "Cairo, Egypt",
  },
  {
    title: "Recommended in Giza",
    location: "Giza, Egypt",
  },
  {
    title: "Recommended in Sharm El Sheikh",
    location: "Sharm El Sheikh, Egypt",
  },
  {
    title: "Recommended in Hurghada",
    location: "Hurghada, Egypt",
  },
];

export default function SuggestedHotelsSections() {
  return (
    <section style={{ padding: "48px 24px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {sections.map((section) => (
          <div key={section.location} style={{ marginBottom: 48 }}>
            <DestinationHotelSection
              title={section.title}
              location={section.location}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
