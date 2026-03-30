"use client";

import { Typography } from "antd";

export default function AppFooter() {
  return (
    <footer
      style={{
        background: "#0f172a",
        color: "#fff",
        marginTop: 40,
        padding: "48px 24px 24px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 24,
        }}
      >
        <div>
          <Typography.Title level={4} style={{ color: "#fff", marginTop: 0 }}>
            Hotel Search
          </Typography.Title>
          <Typography.Paragraph style={{ color: "rgba(255,255,255,0.75)" }}>
            A modern hotel discovery platform focused on performance, scalable
            architecture, and smooth UX.
          </Typography.Paragraph>
        </div>

        <div>
          <Typography.Title level={5} style={{ color: "#fff" }}>
            Popular destinations
          </Typography.Title>
          <Typography.Paragraph
            style={{ color: "rgba(255,255,255,0.75)", marginBottom: 8 }}
          >
            Cairo
          </Typography.Paragraph>
          <Typography.Paragraph
            style={{ color: "rgba(255,255,255,0.75)", marginBottom: 8 }}
          >
            Giza
          </Typography.Paragraph>
          <Typography.Paragraph
            style={{ color: "rgba(255,255,255,0.75)", marginBottom: 8 }}
          >
            Sharm El Sheikh
          </Typography.Paragraph>
          <Typography.Paragraph
            style={{ color: "rgba(255,255,255,0.75)", marginBottom: 0 }}
          >
            Hurghada
          </Typography.Paragraph>
        </div>

        <div>
          <Typography.Title level={5} style={{ color: "#fff" }}>
            Experience
          </Typography.Title>
          <Typography.Paragraph
            style={{ color: "rgba(255,255,255,0.75)", marginBottom: 8 }}
          >
            Fast hotel browsing
          </Typography.Paragraph>
          <Typography.Paragraph
            style={{ color: "rgba(255,255,255,0.75)", marginBottom: 8 }}
          >
            Search by destination
          </Typography.Paragraph>
          <Typography.Paragraph
            style={{ color: "rgba(255,255,255,0.75)", marginBottom: 0 }}
          >
            Clean booking-inspired UI
          </Typography.Paragraph>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: "24px auto 0",
          paddingTop: 16,
          borderTop: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <Typography.Text style={{ color: "rgba(255,255,255,0.65)" }}>
          © 2026 Hotel Search Platform. All rights reserved.
        </Typography.Text>
      </div>
    </footer>
  );
}
