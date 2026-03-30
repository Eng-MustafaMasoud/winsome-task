"use client";

import Image from "next/image";
import Link from "next/link";
import { Alert, Button, Card, Rate, Skeleton, Tag, Typography } from "antd";
import { useHotelById } from "../hooks/use-hotel-by-id";

type Props = {
  hotelId: string;
};

export default function HotelDetails({ hotelId }: Props) {
  const { data, isLoading, isError, error } = useHotelById(hotelId);

  if (isLoading) {
    return (
      <div className="hotel-details-page">
        <div className="hotel-details-container">
          <Skeleton active paragraph={{ rows: 10 }} />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="hotel-details-page">
        <div className="hotel-details-container">
          <Alert
            type="error"
            showIcon
            title="Failed to load hotel details"
            description={
              error instanceof Error ? error.message : "Unknown error"
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="hotel-details-page">
      <div className="hotel-details-container">
        <Link href="/hotel">
          <Button style={{ marginBottom: 20 }}>Back to results</Button>
        </Link>

        <section className="hotel-details-card p-4">
          <div className="flex flex-col  gap-6">
            <div className="hotel-details-image-wrap">
              <Image
                src={data.image}
                alt={data.name}
                fill
                unoptimized
                className="hotel-details-image"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 60vw"
              />
            </div>

            <div className="hotel-details-content">
              <Typography.Title
                level={2}
                style={{ marginTop: 0, marginBottom: 8 }}
              >
                {data.name}
              </Typography.Title>

              <Typography.Paragraph
                type="secondary"
                style={{ marginBottom: 12 }}
              >
                {data.location}
              </Typography.Paragraph>

              <div style={{ marginBottom: 16 }}>
                <Rate disabled allowHalf value={data.rating} />
                <Typography.Text style={{ display: "block", marginTop: 6 }}>
                  {data.rating} / 5 rating
                </Typography.Text>
              </div>

              <Tag
                color="gold"
                style={{ borderRadius: 999, paddingInline: 10 }}
              >
                ${data.price} / night
              </Tag>

              <Typography.Paragraph style={{ marginTop: 20, marginBottom: 20 }}>
                A stylish hotel with modern comfort, great accessibility, and a
                premium stay experience for leisure and business travelers.
              </Typography.Paragraph>

              <div className="hotel-details-info-grid">
                <div className="hotel-details-info-card">
                  <Typography.Text strong>Check-in</Typography.Text>
                  <Typography.Paragraph
                    type="secondary"
                    style={{ margin: "6px 0 0" }}
                  >
                    From 2:00 PM
                  </Typography.Paragraph>
                </div>

                <div className="hotel-details-info-card">
                  <Typography.Text strong>Check-out</Typography.Text>
                  <Typography.Paragraph
                    type="secondary"
                    style={{ margin: "6px 0 0" }}
                  >
                    Until 12:00 PM
                  </Typography.Paragraph>
                </div>

                <div className="hotel-details-info-card">
                  <Typography.Text strong>Guests</Typography.Text>
                  <Typography.Paragraph
                    type="secondary"
                    style={{ margin: "6px 0 0" }}
                  >
                    Family-friendly stay
                  </Typography.Paragraph>
                </div>

                <div className="hotel-details-info-card">
                  <Typography.Text strong>Popular amenity</Typography.Text>
                  <Typography.Paragraph
                    type="secondary"
                    style={{ margin: "6px 0 0" }}
                  >
                    Pool & free Wi-Fi
                  </Typography.Paragraph>
                </div>
              </div>

              <Typography.Title level={4} style={{ marginTop: 24 }}>
                Location on map
              </Typography.Title>

              <div className="hotel-map-wrap">
                <iframe
                  title="hotel-map"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(data.location)}&z=13&output=embed`}
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
