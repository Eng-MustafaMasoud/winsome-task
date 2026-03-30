"use client";

import SearchForm from "@/features/hotel-search/components/search-form";
import { Typography } from "antd";

export default function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        backgroundImage:
          'linear-gradient(rgba(8,15,35,0.55), rgba(8,15,35,0.65)), url("https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            maxWidth: 760,
            marginBottom: 28,
          }}
        >
          <Typography.Title
            level={1}
            style={{
              color: "#fff",
              marginBottom: 12,
              fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
              lineHeight: 1.1,
            }}
          >
            Find your next perfect hotel stay
          </Typography.Title>

          <Typography.Paragraph
            style={{
              color: "rgba(255,255,255,0.88)",
              fontSize: 18,
              marginBottom: 0,
              maxWidth: 620,
            }}
          >
            Search beautiful stays across Cairo, Giza, Sharm El Sheikh,
            Hurghada, Alexandria, and more.
          </Typography.Paragraph>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(10px)",
            borderRadius: 24,
            padding: 20,
            boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
          }}
        >
          <SearchForm />
        </div>
      </div>
    </section>
  );
}
