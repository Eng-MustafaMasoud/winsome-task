"use client";

import { Button, Card, Space, Tag, Typography } from "antd";
import Link from "next/link";

const { Title, Paragraph } = Typography;

type Props = {
  location: string;
  checkIn: string;
  checkOut: string;
  adults: string;
  children: string;
  rooms: string;
};

export default function HotelResultsHeader({
  location,
  checkIn,
  checkOut,
  adults,
  children,
  rooms,
}: Props) {
  return (
    <Card
      style={{
        marginBottom: 24,
        borderRadius: 24,
        boxShadow: "0 14px 40px rgba(15, 23, 42, 0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "start",
          justifyContent: "space-between",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <div>
          <Title level={2} style={{ marginTop: 0, marginBottom: 8 }}>
            {location ? `Hotels in ${location}` : "All Hotels"}
          </Title>

          <Paragraph type="secondary" style={{ marginBottom: 12 }}>
            Explore available stays based on your selected destination and trip
            details.
          </Paragraph>

          <Space wrap size={[8, 8]}>
            {location ? <Tag color="blue">{location}</Tag> : null}
            {checkIn ? <Tag color="geekblue">Check-in: {checkIn}</Tag> : null}
            {checkOut ? <Tag color="purple">Check-out: {checkOut}</Tag> : null}
            <Tag color="green">{adults} Adults</Tag>
            <Tag color="gold">{children} Children</Tag>
            <Tag color="cyan">{rooms} Rooms</Tag>
          </Space>
        </div>

        <Link href="/">
          <Button size="large">Back to Search</Button>
        </Link>
      </div>
    </Card>
  );
}
