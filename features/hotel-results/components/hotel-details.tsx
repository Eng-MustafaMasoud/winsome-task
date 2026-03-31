"use client";

import Image from "next/image";
import Link from "next/link";
import { Alert, Button, Card, Rate, Skeleton, Tag, Typography } from "antd";
import {
  ArrowLeftOutlined,
  EnvironmentOutlined,
  StarFilled,
  ClockCircleOutlined,
  UserOutlined,
  WifiOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { useHotelById } from "../hooks/use-hotel-by-id";

type Props = {
  hotelId: string;
};

type InfoItemProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <Card
      variant={"borderless"}
      className="h-full rounded-2xl border border-slate-200 shadow-sm"
      styles={{ body: { padding: 16 } }}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          {icon}
        </div>

        <div className="min-w-0">
          <Typography.Text className="block text-sm font-semibold text-slate-900">
            {label}
          </Typography.Text>
          <Typography.Text className="mt-1 block text-sm text-slate-500">
            {value}
          </Typography.Text>
        </div>
      </div>
    </Card>
  );
}

function HotelDetailsSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Skeleton.Button active className="!h-10 !w-36 !rounded-xl" />
      </div>

      <Card
        variant={"borderless"}
        className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm"
        styles={{ body: { padding: 0 } }}
      >
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
          <div className="relative min-h-[320px] overflow-hidden bg-slate-100 lg:min-h-[620px]">
            <Skeleton.Image active className="!h-full !w-full !rounded-none" />
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <Skeleton active paragraph={{ rows: 3 }} title={{ width: "60%" }} />

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <Card
                  key={index}
                  variant={"borderless"}
                  className="rounded-2xl border border-slate-200 shadow-sm"
                  styles={{ body: { padding: 16 } }}
                >
                  <Skeleton active paragraph={{ rows: 2 }} title={false} />
                </Card>
              ))}
            </div>

            <div className="mt-8">
              <Skeleton active paragraph={{ rows: 6 }} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function HotelDetails({ hotelId }: Props) {
  const { data, isLoading, isError, error } = useHotelById(hotelId);

  if (isLoading) {
    return <HotelDetailsSkeleton />;
  }

  if (isError || !data) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Alert
          type="error"
          showIcon
          message="Failed to load hotel details"
          description={
            error instanceof Error
              ? error.message
              : "Something went wrong while loading the hotel details."
          }
          className="rounded-2xl"
        />
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link href="/hotel" aria-label="Back to hotel results">
          <Button
            size="large"
            icon={<ArrowLeftOutlined />}
            className="!h-11 !rounded-xl !border-slate-200 !px-4 !shadow-sm hover:!border-slate-300 hover:!text-slate-900"
          >
            Back to results
          </Button>
        </Link>
      </div>

      <Card
        variant={"borderless"}
        className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
        styles={{ body: { padding: 0 } }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[320px] bg-slate-100 lg:min-h-[760px]">
            <Image
              src={data.image}
              alt={data.name}
              fill
              priority
              unoptimized
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <Tag className="m-0 rounded-full border-0 bg-white/95 px-4 py-1 text-sm font-medium text-slate-900 shadow-sm">
                  <DollarOutlined className="mr-1" />${data.price} / night
                </Tag>

                <Tag className="m-0 rounded-full border-0 bg-amber-400 px-4 py-1 text-sm font-medium text-slate-950 shadow-sm">
                  <StarFilled className="mr-1" />
                  {data.rating.toFixed(1)} rating
                </Tag>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="border-b border-slate-100 pb-6">
              <Typography.Title className="!mb-3 !text-3xl !font-semibold !tracking-tight !text-slate-950 sm:!text-4xl">
                {data.name}
              </Typography.Title>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-500">
                <div className="flex items-center gap-2 text-sm sm:text-base">
                  <EnvironmentOutlined className="text-slate-400" />
                  <span>{data.location}</span>
                </div>

                <div className="flex items-center gap-2 text-sm sm:text-base">
                  <Rate
                    disabled
                    allowHalf
                    value={data.rating}
                    className="text-sm"
                  />
                  <span className="font-medium text-slate-700">
                    {data.rating.toFixed(1)} / 5
                  </span>
                </div>
              </div>
            </div>

            <div className="py-6">
              <Typography.Paragraph className="!mb-0 !text-base !leading-7 !text-slate-600">
                A stylish hotel with modern comfort, excellent accessibility,
                and a premium stay experience for both leisure and business
                travelers. Carefully designed spaces, convenient amenities, and
                a welcoming atmosphere make it a comfortable choice for every
                kind of trip.
              </Typography.Paragraph>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoItem
                icon={<ClockCircleOutlined />}
                label="Check-in"
                value="From 2:00 PM"
              />
              <InfoItem
                icon={<ClockCircleOutlined />}
                label="Check-out"
                value="Until 12:00 PM"
              />
              <InfoItem
                icon={<UserOutlined />}
                label="Guests"
                value="Family-friendly stay"
              />
              <InfoItem
                icon={<WifiOutlined />}
                label="Popular amenity"
                value="Pool & free Wi-Fi"
              />
            </div>

            <div className="mt-8">
              <div className="mb-4 flex items-center justify-between gap-3">
                <Typography.Title level={4} className="!mb-0 !text-slate-900">
                  Location on map
                </Typography.Title>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                <iframe
                  title="hotel-map"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    data.location,
                  )}&z=13&output=embed`}
                  loading="lazy"
                  className="h-[320px] w-full border-0"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
