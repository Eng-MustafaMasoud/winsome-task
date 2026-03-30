"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, Rate, Typography } from "antd";
import type { Hotel } from "../types/hotel.types";

type Props = {
  hotel: Hotel;
};

export default function HotelCard({ hotel }: Props) {
  return (
    <Link href={`/hotel/${hotel.id}`} style={{ display: "block" }}>
      <Card
        hoverable
        style={{
          borderRadius: 24,
          overflow: "hidden",
          border: "1px solid rgba(15,23,42,0.06)",
          boxShadow: "0 10px 30px rgba(15,23,42,0.06)",
          transition: "all 0.3s ease",
        }}
        styles={{
          body: { padding: 16 },
        }}
        className="hotel-card"
        cover={
          <div style={{ position: "relative", height: 220 }}>
            <Image
              src={hotel.image}
              alt={hotel.name}
              fill
              unoptimized
              style={{ objectFit: "cover" }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.4), transparent 60%)",
              }}
            />

            <div
              style={{
                position: "absolute",
                bottom: 12,
                left: 12,
                background: "rgba(0,0,0,0.72)",
                color: "#fff",
                padding: "6px 12px",
                borderRadius: 999,
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              ${hotel.price} / night
            </div>
          </div>
        }
      >
        <Typography.Title level={5} style={{ margin: 0 }}>
          {hotel.name}
        </Typography.Title>

        <Typography.Text
          type="secondary"
          style={{ display: "block", marginTop: 4 }}
        >
          {hotel.location}
        </Typography.Text>

        <div
          style={{
            marginTop: 10,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Rate
            disabled
            allowHalf
            value={hotel.rating}
            style={{ fontSize: 14 }}
          />
          <Typography.Text strong>{hotel.rating}</Typography.Text>
        </div>
      </Card>

      <style jsx>{`
        .hotel-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(15, 23, 42, 0.12);
        }
      `}</style>
    </Link>
  );
}
