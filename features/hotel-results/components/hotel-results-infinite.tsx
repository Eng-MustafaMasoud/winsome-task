"use client";

import {
  useCallback,
  useDeferredValue,
  useMemo,
  useRef,
  useState,
} from "react";
import { Alert, Empty, Skeleton, Typography } from "antd";
import { EnvironmentOutlined, LoadingOutlined } from "@ant-design/icons";
import { useSearchParams } from "next/navigation";
import HotelList from "./hotel-list";
import HotelFilters, { RatingFilter, SortOption } from "./hotel-filters";
import { useHotelsInfinite } from "../hooks/use-hotels-infinite";
import { useIntersectionObserver } from "@/shared/hooks/use-intersection-observer";

const PRICE_MIN = 0;
const PRICE_MAX = 1000;
const PRICE_STEP = 10;
const INITIAL_PRICE_RANGE: [number, number] = [PRICE_MIN, PRICE_MAX];

function ResultsPageSkeleton() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="space-y-3">
          <Skeleton.Input active className="!h-8 !w-52 !rounded-xl" />
          <Skeleton.Input active className="!h-5 !w-80 !rounded-xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-4 shadow-sm">
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <Skeleton
                  active
                  title={{ width: "45%" }}
                  paragraph={{ rows: 3 }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <Skeleton.Image
                active
                className="!h-[220px] !w-full !rounded-none"
              />
              <div className="p-4">
                <Skeleton
                  active
                  title={{ width: "70%" }}
                  paragraph={{ rows: 3 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HotelResultsInfinite() {
  const searchParams = useSearchParams();
  const location = searchParams.get("location") || "";

  const [priceRange, setPriceRange] =
    useState<[number, number]>(INITIAL_PRICE_RANGE);
  const [minRating, setMinRating] = useState<RatingFilter>("any");
  const [maxDistance, setMaxDistance] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("best-match");

  const deferredPriceRange = useDeferredValue(priceRange);
  const deferredMinRating = useDeferredValue(minRating);
  const deferredMaxDistance = useDeferredValue(maxDistance);
  const deferredSortBy = useDeferredValue(sortBy);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useHotelsInfinite({
    location,
    limit: 20,
  });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handleIntersect = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useIntersectionObserver({
    targetRef: loadMoreRef,
    enabled: Boolean(hasNextPage) && !isFetchingNextPage,
    onIntersect: handleIntersect,
  });

  const allHotels = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  const filteredHotels = useMemo(() => {
    let result = allHotels.filter(
      (hotel) =>
        hotel.price >= deferredPriceRange[0] &&
        hotel.price <= deferredPriceRange[1],
    );

    if (deferredMinRating !== "any") {
      result = result.filter((hotel) => hotel.rating >= deferredMinRating);
    }

    // Assumes hotel.distance exists and is a number in km
    if (deferredMaxDistance !== null) {
      result = result.filter((hotel) => hotel.distance <= deferredMaxDistance);
    }

    const sorted = [...result];

    switch (deferredSortBy) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "rating-desc":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "distance-asc":
        sorted.sort((a, b) => a.distance - b.distance);
        break;
      default:
        sorted.sort((a, b) => {
          const scoreA = a.rating * 2 - a.price / 100;
          const scoreB = b.rating * 2 - b.price / 100;
          return scoreB - scoreA;
        });
        break;
    }

    return sorted;
  }, [
    allHotels,
    deferredPriceRange,
    deferredMinRating,
    deferredMaxDistance,
    deferredSortBy,
  ]);

  const total = data?.pages?.[0]?.total ?? filteredHotels.length;
  const loadedCount = allHotels.length;
  const visibleCount = filteredHotels.length;

  const activeFiltersCount =
    (minRating !== "any" ? 1 : 0) +
    (maxDistance !== null ? 1 : 0) +
    (priceRange[0] !== PRICE_MIN || priceRange[1] !== PRICE_MAX ? 1 : 0);

  const resultsTitle = location ? `Hotels in ${location}` : "All hotels";
  const resultsSubtitle = `${visibleCount} shown • ${loadedCount} loaded of ${total}`;

  const handleResetFilters = () => {
    setPriceRange(INITIAL_PRICE_RANGE);
    setMinRating("any");
    setMaxDistance(null);
    setSortBy("best-match");
  };

  if (isLoading) {
    return <ResultsPageSkeleton />;
  }

  if (isError) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Alert
          type="error"
          showIcon
          message="Failed to load hotel results"
          description={
            error instanceof Error
              ? error.message
              : "Something went wrong while loading the hotel results."
          }
          className="rounded-2xl"
        />
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <div className="mb-3 inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
              <EnvironmentOutlined className="mr-2" />
              Destination search
            </div>

            <Typography.Title className="!mb-2 !text-2xl !font-semibold !tracking-tight !text-slate-950 sm:!text-3xl">
              {resultsTitle}
            </Typography.Title>

            <Typography.Paragraph className="!mb-0 !text-sm !text-slate-500 sm:!text-base">
              {resultsSubtitle}
            </Typography.Paragraph>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {activeFiltersCount > 0 ? (
              <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
                {activeFiltersCount} active filter
                {activeFiltersCount > 1 ? "s" : ""}
              </div>
            ) : null}

            {(isFetching || isFetchingNextPage) && (
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-600">
                <LoadingOutlined spin />
                Updating results
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <div className="min-w-0">
          <HotelFilters
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            minRating={minRating}
            onMinRatingChange={setMinRating}
            maxDistance={maxDistance}
            onMaxDistanceChange={setMaxDistance}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onReset={handleResetFilters}
            priceMin={PRICE_MIN}
            priceMax={PRICE_MAX}
            priceStep={PRICE_STEP}
          />
        </div>

        <div className="min-w-0">
          {!filteredHotels.length ? (
            <div className="rounded-3xl border border-slate-200 bg-white py-16 shadow-sm">
              <Empty
                description={
                  <span className="text-slate-500">
                    No hotels match your current filters.
                  </span>
                }
              />
            </div>
          ) : (
            <>
              <HotelList hotels={filteredHotels} />

              <div
                ref={loadMoreRef}
                className="mt-8 flex min-h-[88px] items-center justify-center"
              >
                {isFetchingNextPage ? (
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
                    <LoadingOutlined spin />
                    Loading more hotels...
                  </div>
                ) : hasNextPage ? (
                  <div className="rounded-full border border-dashed border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-500">
                    Scroll to load more
                  </div>
                ) : (
                  <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500 shadow-sm">
                    You’ve reached the end
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
