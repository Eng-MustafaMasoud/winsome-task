"use client";

import { useMemo, useRef, useState } from "react";
import { Alert, Empty, Flex, Select, Slider, Spin, Typography } from "antd";
import { useSearchParams } from "next/navigation";
import HotelList from "./hotel-list";
import { useHotelsInfinite } from "../hooks/use-hotels-infinite";
import { useIntersectionObserver } from "@/shared/hooks/use-intersection-observer";

export default function HotelResultsInfinite() {
  const searchParams = useSearchParams();
  const location = searchParams.get("location") || "";

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [minRating, setMinRating] = useState<number | "any">("any");
  const [sortBy, setSortBy] = useState("best-match");

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useHotelsInfinite({
    location,
    limit: 20,
  });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useIntersectionObserver({
    targetRef: loadMoreRef,
    enabled: Boolean(hasNextPage) && !isFetchingNextPage,
    onIntersect: () => {
      fetchNextPage();
    },
  });

  const hotels = useMemo(() => {
    const allHotels = data?.pages.flatMap((page) => page.data) || [];

    let result = [...allHotels];

    result = result.filter(
      (hotel) => hotel.price >= priceRange[0] && hotel.price <= priceRange[1],
    );

    if (minRating !== "any") {
      result = result.filter((hotel) => hotel.rating >= minRating);
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "rating-desc") {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      result.sort((a, b) => {
        const scoreA = a.rating * 2 - a.price / 100;
        const scoreB = b.rating * 2 - b.price / 100;
        return scoreB - scoreA;
      });
    }

    return result;
  }, [data, priceRange, minRating, sortBy]);

  const total = data?.pages?.[0]?.total ?? hotels.length;

  if (isLoading) {
    return (
      <Flex justify="center" align="center" style={{ minHeight: 300 }}>
        <Spin size="large" />
      </Flex>
    );
  }

  if (isError) {
    return (
      <div style={{ padding: 24 }}>
        <Alert
          type="error"
          showIcon
          title="Failed to load hotel results"
          description={error instanceof Error ? error.message : "Unknown error"}
        />
      </div>
    );
  }

  if (!hotels.length) {
    return (
      <Flex justify="center" align="center" style={{ minHeight: 320 }}>
        <Empty description="No hotels found" />
      </Flex>
    );
  }

  return (
    <div
      style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px 56px" }}
    >
      <div style={{ marginBottom: 24 }}>
        <Typography.Title level={2} style={{ marginBottom: 8 }}>
          {location ? `Hotels in ${location}` : "All Hotels"}
        </Typography.Title>

        <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
          Loaded {hotels.length} of {total} hotels
        </Typography.Paragraph>
      </div>

      <div className="hotel-filters-grid">
        <div className="hotel-filter-card hotel-filter-price">
          <Typography.Text strong>Price range</Typography.Text>
          <div style={{ marginTop: 12, paddingInline: 6 }}>
            <Slider
              range
              min={0}
              max={1000}
              step={10}
              value={priceRange}
              onChange={(value) => setPriceRange(value as [number, number])}
            />
            <Typography.Text type="secondary">
              ${priceRange[0]} - ${priceRange[1]}
            </Typography.Text>
          </div>
        </div>

        <div className="hotel-filter-card">
          <Typography.Text strong>Minimum rating</Typography.Text>
          <Select
            style={{ width: "100%", marginTop: 10 }}
            value={minRating}
            onChange={setMinRating}
            options={[
              { label: "Any", value: "any" },
              { label: "3+", value: 3 },
              { label: "4+", value: 4 },
              { label: "4.5+", value: 4.5 },
            ]}
          />
        </div>

        <div className="hotel-filter-card">
          <Typography.Text strong>Sort by</Typography.Text>
          <Select
            style={{ width: "100%", marginTop: 10 }}
            value={sortBy}
            onChange={setSortBy}
            options={[
              { label: "Best match", value: "best-match" },
              { label: "Price low to high", value: "price-asc" },
              { label: "Rating", value: "rating-desc" },
            ]}
          />
        </div>
      </div>

      <HotelList hotels={hotels} />

      <div
        ref={loadMoreRef}
        style={{
          minHeight: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 24,
        }}
      >
        {isFetchingNextPage ? (
          <Spin />
        ) : hasNextPage ? (
          <Typography.Text type="secondary">
            Scroll to load more
          </Typography.Text>
        ) : (
          <Typography.Text type="secondary">
            No More hotels to load
          </Typography.Text>
        )}
      </div>
    </div>
  );
}
