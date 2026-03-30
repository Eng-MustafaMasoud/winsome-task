"use client";

import dayjs, { Dayjs } from "dayjs";
import { DatePicker, Form } from "antd";

const { RangePicker } = DatePicker;

export default function StayDateRange() {
  const disabledDate = (current: Dayjs) => {
    return current && current < dayjs().startOf("day");
  };

  return (
    <Form.Item
      label="Stay Dates"
      name="dates"
      rules={[
        {
          required: true,
          message: "Please select check-in and check-out dates",
        },
      ]}
      style={{ marginBottom: 0 }}
    >
      <RangePicker
        size="large"
        style={{ width: "100%" }}
        disabledDate={disabledDate}
        format="YYYY-MM-DD"
        inputReadOnly
      />
    </Form.Item>
  );
}
