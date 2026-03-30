"use client";

import { Typography } from "antd";

const { Title, Paragraph, Text } = Typography;

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
          <Title level={4} style={{ color: "#fff", marginTop: 0 }}>
            Hotel Search
          </Title>
          <Paragraph style={{ color: "rgba(255,255,255,0.75)" }}>
            A modern hotel discovery platform focused on performance, scalable
            architecture, and smooth UX.
          </Paragraph>
        </div>

        <div>
          <Title level={5} style={{ color: "#fff" }}>
            Popular destinations
          </Title>
          <Paragraph
            style={{ color: "rgba(255,255,255,0.75)", marginBottom: 8 }}
          >
            Cairo
          </Paragraph>
          <Paragraph
            style={{ color: "rgba(255,255,255,0.75)", marginBottom: 8 }}
          >
            Giza
          </Paragraph>
          <Paragraph
            style={{ color: "rgba(255,255,255,0.75)", marginBottom: 8 }}
          >
            Sharm El Sheikh
          </Paragraph>
          <Paragraph
            style={{ color: "rgba(255,255,255,0.75)", marginBottom: 0 }}
          >
            Hurghada
          </Paragraph>
        </div>

        <div>
          <Title level={5} style={{ color: "#fff" }}>
            Experience
          </Title>
          <Paragraph
            style={{ color: "rgba(255,255,255,0.75)", marginBottom: 8 }}
          >
            Fast hotel browsing
          </Paragraph>
          <Paragraph
            style={{ color: "rgba(255,255,255,0.75)", marginBottom: 8 }}
          >
            Search by destination
          </Paragraph>
          <Paragraph
            style={{ color: "rgba(255,255,255,0.75)", marginBottom: 0 }}
          >
            Clean booking-inspired UI
          </Paragraph>
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
        <Text style={{ color: "rgba(255,255,255,0.65)" }}>
          © 2026 Hotel Search Platform. All rights reserved.
        </Text>
      </div>
    </footer>
  );
}
