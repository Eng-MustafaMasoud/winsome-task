"use client";

import HeroSection from "@/features/home/components/hero-section";
import SuggestedHotelsSections from "@/features/home/components/suggested-hotels-sections";

export default function HomePage() {
  return (
    <main style={{ minHeight: "100vh", background: "#f5f7fb" }}>
      <HeroSection />
      <SuggestedHotelsSections />
    </main>
  );
}
