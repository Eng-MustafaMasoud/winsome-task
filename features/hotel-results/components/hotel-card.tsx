"use client";

import Image from "next/image";
import { Card, Rate, Typography } from "antd";
import type { Hotel } from "../types/hotel.types";

const { Title, Text } = Typography;

type HotelCardProps = {
  hotel: Hotel;
};

export default function HotelCard({ hotel }: HotelCardProps) {
  return (
    <Card
      hoverable
      style={{
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 10px 28px rgba(15,23,42,0.08)",
      }}
      cover={
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 220,
          }}
        >
          <Image
            src={hotel.image}
            alt={hotel.name}
            fill
            sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, (max-width: 1200px) 33vw, 25vw"
            style={{ objectFit: "cover" }}
            priority={false}
          />
        </div>
      }
      styles={{
        body: {
          padding: 18,
        },
      }}
    >
      <Title level={4} style={{ marginBottom: 8, marginTop: 0 }}>
        {hotel.name}
      </Title>

      <Text type="secondary">{hotel.location}</Text>

      <div style={{ marginTop: 12 }}>
        <Rate disabled allowHalf value={hotel.rating} />
        <div style={{ marginTop: 4 }}>
          <Text>{hotel.rating} / 5</Text>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <Title level={5} style={{ margin: 0 }}>
          ${hotel.price}
        </Title>
        <Text type="secondary">per night</Text>
      </div>
    </Card>
  );
}
