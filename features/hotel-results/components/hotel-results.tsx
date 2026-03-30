"use client";

import { useMemo } from "react";
import { Alert, Empty, Flex, Typography } from "antd";
import { useSearchParams } from "next/navigation";
import HotelList from "./hotel-list";
import { useHotels } from "../hooks/use-hotels";
import HotelResultsHeader from "./hotel-results-header";
import HotelResultsSkeleton from "./hotel-results-skeleton";

const { Paragraph } = Typography;

export default function HotelResults() {
  const { data, isLoading, isError, error, refetch } = useHotels();
  const searchParams = useSearchParams();

  const location = searchParams.get("location") || "";
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const adults = searchParams.get("adults") || "2";
  const children = searchParams.get("children") || "0";
  const rooms = searchParams.get("rooms") || "1";

  const filteredHotels = useMemo(() => {
    if (!data) return [];
    if (!location) return data;

    return data.filter((hotel) =>
      hotel.location.toLowerCase().includes(location.toLowerCase()),
    );
  }, [data, location]);

  if (isLoading) {
    return <HotelResultsSkeleton />;
  }

  if (isError) {
    return (
      <div style={{ padding: 24 }}>
        <Alert
          type="error"
          showIcon
          message="Something went wrong"
          description={
            error instanceof Error ? error.message : "Failed to load hotels"
          }
        />
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #eef4ff 0%, #f8fbff 32%, #ffffff 100%)",
        padding: "32px 24px 56px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <HotelResultsHeader
          location={location}
          checkIn={checkIn}
          checkOut={checkOut}
          adults={adults}
          children={children}
          rooms={rooms}
        />

        {location ? (
          <Paragraph type="secondary" style={{ marginBottom: 24 }}>
            Showing hotel results for <strong>{location}</strong>.
          </Paragraph>
        ) : null}

        {!filteredHotels.length ? (
          <Flex justify="center" align="center" style={{ minHeight: 320 }}>
            <Empty description="No hotels found for your search" />
          </Flex>
        ) : (
          <HotelList hotels={filteredHotels} />
        )}
      </div>
    </div>
  );
}
