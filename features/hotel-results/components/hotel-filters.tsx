"use client";

import { Card, Select, Slider, Typography } from "antd";

type Props = {
  priceRange: [number, number];
  onPriceRangeChange: (value: [number, number]) => void;
  minRating: number | null;
  onMinRatingChange: (value: number | null) => void;
  maxDistance: number | null;
  onMaxDistanceChange: (value: number | null) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
};

export default function HotelFilters({
  priceRange,
  onPriceRangeChange,
  minRating,
  onMinRatingChange,
  maxDistance,
  onMaxDistanceChange,
  sortBy,
  onSortChange,
}: Props) {
  return (
    <Card
      style={{
        borderRadius: 20,
        marginBottom: 24,
        boxShadow: "0 12px 30px rgba(15,23,42,0.06)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 20,
          alignItems: "start",
        }}
      >
        <div>
          <Typography.Text strong>Price range</Typography.Text>
          <div style={{ marginTop: 14, paddingInline: 6 }}>
            <Slider
              range
              min={0}
              max={1000}
              step={10}
              value={priceRange}
              onChange={(value) =>
                onPriceRangeChange(value as [number, number])
              }
            />
            <Typography.Text type="secondary">
              ${priceRange[0]} - ${priceRange[1]}
            </Typography.Text>
          </div>
        </div>

        <div>
          <Typography.Text strong>Minimum rating</Typography.Text>
          <Select
            style={{ width: "100%", marginTop: 10 }}
            value={minRating}
            onChange={onMinRatingChange}
            options={[
              { label: "Any", value: null },
              { label: "3+", value: 3 },
              { label: "4+", value: 4 },
              { label: "4.5+", value: 4.5 },
            ]}
          />
        </div>

        <div>
          <Typography.Text strong>Max distance</Typography.Text>
          <Select
            style={{ width: "100%", marginTop: 10 }}
            value={maxDistance}
            onChange={onMaxDistanceChange}
            options={[
              { label: "Any", value: null },
              { label: "1 km", value: 1 },
              { label: "3 km", value: 3 },
              { label: "5 km", value: 5 },
              { label: "10 km", value: 10 },
            ]}
          />
        </div>

        <div>
          <Typography.Text strong>Sort by</Typography.Text>
          <Select
            style={{ width: "100%", marginTop: 10 }}
            value={sortBy}
            onChange={onSortChange}
            options={[
              { label: "Best match", value: "best-match" },
              { label: "Price low to high", value: "price-asc" },
              { label: "Rating", value: "rating-desc" },
            ]}
          />
        </div>
      </div>
    </Card>
  );
}
