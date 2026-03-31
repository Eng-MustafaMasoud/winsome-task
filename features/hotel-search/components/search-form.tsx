"use client";

import { memo, useCallback, useMemo } from "react";
import { Button, Form, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useRouter } from "nextjs-toploader/app";
import dayjs, { Dayjs } from "dayjs";

import LocationAutocomplete from "./location-autocomplete";
import StayDateRange from "./stay-date-range";
import GuestsSelector from "./guests-selector";
import type { GuestsState } from "../types/hotel-search.types";

type FormValues = {
  location: string;
  dates: [Dayjs, Dayjs];
  guests: GuestsState;
};

const INITIAL_VALUES: Pick<FormValues, "location" | "guests"> = {
  location: "",
  guests: {
    adults: 2,
    children: 0,
    rooms: 1,
  },
};

type FieldCardProps = {
  title: string;
  hint: string;
  children: React.ReactNode;
};

const FieldCard = memo(function FieldCard({
  title,
  hint,
  children,
}: FieldCardProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md sm:p-5">
      <header className="mb-3">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        <p className="mt-1 text-xs text-slate-500">{hint}</p>
      </header>
      {children}
    </section>
  );
});

export default function SearchForm() {
  const [form] = Form.useForm<FormValues>();
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const sectionContent = useMemo(
    () => ({
      location: {
        title: "Where to?",
        hint: "Search by city, destination, or hotel",
      },
      dates: {
        title: "When?",
        hint: "Choose check-in and check-out dates",
      },
      guests: {
        title: "Who's coming?",
        hint: "Select guests and rooms",
      },
    }),
    [],
  );

  const handleFinish = useCallback(
    (values: FormValues) => {
      const location = values.location?.trim();
      const [checkIn, checkOut] = values.dates || [];
      const guests = values.guests;

      if (!location) {
        messageApi.error("Please select a location");
        return;
      }

      if (!checkIn || !checkOut) {
        messageApi.error("Please select check-in and check-out dates");
        return;
      }

      const searchParams = new URLSearchParams({
        location,
        checkIn: dayjs(checkIn).format("YYYY-MM-DD"),
        checkOut: dayjs(checkOut).format("YYYY-MM-DD"),
        adults: String(guests?.adults ?? 2),
        children: String(guests?.children ?? 0),
        rooms: String(guests?.rooms ?? 1),
      });

      router.push(`/hotel?${searchParams.toString()}`);
    },
    [messageApi, router],
  );

  return (
    <>
      {contextHolder}

      <section className="w-full">
        <div className="mx-auto w-full rounded-[32px] border border-white/70 bg-white/90 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:p-6 lg:p-7">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Find your next stay
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Pick a destination, choose your travel dates, and set your guests.
            </p>
          </div>

          <Form<FormValues>
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            initialValues={INITIAL_VALUES}
            requiredMark={false}
          >
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <FieldCard
                title={sectionContent.location.title}
                hint={sectionContent.location.hint}
              >
                <LocationAutocomplete />
              </FieldCard>

              <FieldCard
                title={sectionContent.dates.title}
                hint={sectionContent.dates.hint}
              >
                <StayDateRange />
              </FieldCard>

              <FieldCard
                title={sectionContent.guests.title}
                hint={sectionContent.guests.hint}
              >
                <Form.Item name="guests" className="!mb-0">
                  <GuestsSelector />
                </Form.Item>
              </FieldCard>
            </div>

            <div className="mt-5 flex flex-col items-stretch gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                Flexible search for comfortable stays.
              </p>

              <Form.Item className="!mb-0">
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SearchOutlined />}
                  size="large"
                  className="!h-12 !rounded-2xl !border-0 !bg-slate-900 !px-6 !font-medium !shadow-[0_10px_25px_rgba(15,23,42,0.16)] transition-all duration-200 hover:!bg-slate-800 hover:!shadow-[0_14px_30px_rgba(15,23,42,0.18)] sm:!min-w-[180px]"
                >
                  Search stays
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </section>
    </>
  );
}
