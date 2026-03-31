"use client";

import { useMemo, useState } from "react";
import { Alert, Empty, Flex, Typography } from "antd";
import { useSearchParams } from "next/navigation";
import HotelList from "./hotel-list";
import HotelFilters, { RatingFilter, SortOption } from "./hotel-filters";
import { useHotels } from "../hooks/use-hotels";
import HotelResultsSkeleton from "./hotel-results-skeleton";
import HotelResultsHeader from "./hotel-results-header";

export default function HotelResults() {
  const { data, isLoading, isError, error } = useHotels();
  const searchParams = useSearchParams();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [minRating, setMinRating] = useState<RatingFilter>("any");
  const [maxDistance, setMaxDistance] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("best-match");

  const location = searchParams.get("location") || "";
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const adults = searchParams.get("adults") || "2";
  const children = searchParams.get("children") || "0";
  const rooms = searchParams.get("rooms") || "1";

  const filteredHotels = useMemo(() => {
    if (!data) return [];

    let result = [...data];

    if (location) {
      result = result.filter((hotel) =>
        hotel.location.toLowerCase().includes(location.toLowerCase()),
      );
    }

    result = result.filter(
      (hotel) => hotel.price >= priceRange[0] && hotel.price <= priceRange[1],
    );

    if (minRating !== "any") {
      result = result.filter((hotel) => hotel.rating >= minRating);
    }

    if (maxDistance !== null) {
      result = result.filter((hotel) => {
        if (typeof hotel.distance !== "number") return true;
        return hotel.distance <= maxDistance;
      });
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "rating-desc") {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      result.sort((a, b) => {
        const scoreA =
          a.rating * 2 -
          a.price / 100 -
          (typeof a.distance === "number" ? a.distance : 0);
        const scoreB =
          b.rating * 2 -
          b.price / 100 -
          (typeof b.distance === "number" ? b.distance : 0);

        return scoreB - scoreA;
      });
    }

    return result;
  }, [data, location, priceRange, minRating, maxDistance, sortBy]);

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

        <HotelFilters
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          minRating={minRating}
          onMinRatingChange={setMinRating}
          maxDistance={maxDistance}
          onMaxDistanceChange={setMaxDistance}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {!filteredHotels.length ? (
          <Flex justify="center" align="center" style={{ minHeight: 320 }}>
            <Empty description="No hotels found for your filters" />
          </Flex>
        ) : (
          <HotelList hotels={filteredHotels} />
        )}
      </div>
    </div>
  );
}
