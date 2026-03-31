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
      label={
        <span className="text-sm font-medium text-slate-700">Stay Dates</span>
      }
      name="dates"
      rules={[
        {
          required: true,
          message: "Please select check-in and check-out dates",
        },
      ]}
      className="!mb-0"
    >
      <RangePicker
        size="large"
        className="!h-[52px] !w-full !rounded-2xl !border-slate-200 !shadow-none transition focus:!border-blue-500"
        disabledDate={disabledDate}
        format="YYYY-MM-DD"
        inputReadOnly
      />
    </Form.Item>
  );
}
