"use client";

import { Badge, Button, Card, Col, Row, Skeleton, Typography } from "antd";
import Link from "next/link";
import type { Hotel } from "@/features/hotel-results/types/hotel.types";
import HotelCard from "@/features/hotel-results/components/hotel-card";

type Props = {
  title: string;
  location: string;
  hotels: Hotel[];
  totalCount: number;
  isLoading: boolean;
};

export default function DestinationHotelSection({
  title,
  location,
  hotels,
  totalCount,
  isLoading,
}: Props) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "end",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: 20,
          flexWrap: "wrap",
        }}
      >
        <div>
          <Typography.Title level={3} style={{ margin: 0 }}>
            {title}
          </Typography.Title>
          <Typography.Paragraph type="secondary" style={{ margin: "8px 0 0" }}>
            {totalCount} hotels available in {location}
          </Typography.Paragraph>
        </div>

        <Link href={`/hotel?location=${encodeURIComponent(location)}`}>
          <Button size="large">View all</Button>
        </Link>
      </div>

      {isLoading ? (
        <Row gutter={[16, 16]}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Col key={index} xs={24} sm={12} lg={6}>
              <Card>
                <Skeleton.Image active style={{ width: "100%", height: 220 }} />
                <Skeleton
                  active
                  paragraph={{ rows: 3 }}
                  style={{ marginTop: 16 }}
                />
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Row gutter={[16, 16]}>
          {hotels.map((hotel) => (
            <Col key={hotel.id} xs={24} sm={12} lg={6}>
              <HotelCard hotel={hotel} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
