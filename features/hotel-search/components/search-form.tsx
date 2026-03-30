"use client";

import { Button, Form, message } from "antd";
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

export default function SearchForm() {
  const [form] = Form.useForm<FormValues>();
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const handleFinish = (values: FormValues) => {
    const [checkIn, checkOut] = values.dates || [];

    if (!values.location?.trim()) {
      messageApi.error("Please select a location");
      return;
    }

    if (!checkIn || !checkOut) {
      messageApi.error("Please select check-in and check-out dates");
      return;
    }

    const params = new URLSearchParams({
      location: values.location,
      checkIn: dayjs(checkIn).format("YYYY-MM-DD"),
      checkOut: dayjs(checkOut).format("YYYY-MM-DD"),
      adults: String(values.guests.adults),
      children: String(values.guests.children),
      rooms: String(values.guests.rooms),
    });

    router.push(`/hotel?${params.toString()}`);
  };

  return (
    <>
      {contextHolder}

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          location: "",
          guests: {
            adults: 2,
            children: 0,
            rooms: 1,
          },
        }}
      >
        <div className="search-form-grid">
          <LocationAutocomplete />
          <StayDateRange />

          <Form.Item label="Guests" name="guests" style={{ marginBottom: 0 }}>
            <GuestsSelector />
          </Form.Item>

          <Form.Item label=" " style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="search-submit-btn"
            >
              Search
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
}
