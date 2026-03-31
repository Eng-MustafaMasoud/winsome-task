"use client";

import { memo, useMemo } from "react";
import Link from "next/link";
import { Button, Card, Col, Row, Skeleton } from "antd";
import type { Hotel } from "@/features/hotel-results/types/hotel.types";
import HotelCard from "@/features/hotel-results/components/hotel-card";
import { ArrowRightOutlined } from "@ant-design/icons";

type Props = {
  title: string;
  location: string;
  hotels: Hotel[];
  totalCount: number;
  isLoading: boolean;
};

const SKELETON_ITEMS = Array.from({ length: 4 });

function DestinationHotelSection({
  title,
  location,
  hotels,
  totalCount,
  isLoading,
}: Props) {
  const viewAllHref = useMemo(
    () => `/hotel?location=${encodeURIComponent(location)}`,
    [location],
  );

  const subtitle = useMemo(() => {
    if (!totalCount) return `No hotels currently available in ${location}`;
    if (totalCount === 1) return `1 hotel available in ${location}`;
    return `${totalCount} hotels available in ${location}`;
  }, [totalCount, location]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
            {subtitle}
          </p>
        </div>

        <Link href={viewAllHref} aria-label={`View all hotels in ${location}`}>
          <Button
            size="large"
            className="group !inline-flex !h-11 !items-center !rounded-xl !border-slate-200 !px-5 !font-medium !shadow-sm transition-all hover:!border-slate-300 hover:!shadow-md"
          >
            View all
            <ArrowRightOutlined className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <Row gutter={[16, 16]}>
          {SKELETON_ITEMS.map((_, index) => (
            <Col key={index} xs={24} sm={12} xl={6}>
              <Card className="overflow-hidden !rounded-2xl !border-slate-200 !shadow-sm">
                <div className="overflow-hidden rounded-xl">
                  <Skeleton.Image
                    active
                    className="!h-[220px] !w-full !rounded-xl"
                  />
                </div>

                <div className="mt-4 space-y-3">
                  <Skeleton
                    active
                    title={{ width: "70%" }}
                    paragraph={{ rows: 3, width: ["100%", "85%", "60%"] }}
                  />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      ) : hotels.length > 0 ? (
        <Row gutter={[16, 16]}>
          {hotels.map((hotel) => (
            <Col key={hotel.id} xs={24} sm={12} xl={6}>
              <HotelCard hotel={hotel} />
            </Col>
          ))}
        </Row>
      ) : (
        <Card className="!rounded-2xl !border-slate-200 !shadow-sm">
          <div className="flex min-h-[180px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 text-center">
            <h3 className="text-lg font-semibold text-slate-900">
              No hotels found
            </h3>
            <p className="mt-2 max-w-md text-sm text-slate-500">
              We could not find available stays for {location} right now. Try
              browsing all listings to explore more options.
            </p>

            <Link href={viewAllHref} className="mt-5">
              <Button
                size="large"
                type="primary"
                className="!h-11 !rounded-xl !px-5 !font-medium"
              >
                Browse hotels
              </Button>
            </Link>
          </div>
        </Card>
      )}
    </section>
  );
}

export default memo(DestinationHotelSection);
