"use client";

import { AutoComplete, Form, Input } from "antd";
import { useState } from "react";
import { useLocationSuggestions } from "../hooks/use-location-suggestions";

type Props = {
  value?: string;
  onChange?: (value: string) => void;
};

export default function LocationAutocomplete({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const searchValue = value || "";
  const { data = [] } = useLocationSuggestions(searchValue);

  return (
    <Form.Item
      label={
        <span className="text-sm font-medium text-slate-700">Location</span>
      }
      name="location"
      rules={[{ required: true, message: "Please select a location" }]}
      className="!mb-0"
    >
      <AutoComplete
        value={searchValue}
        options={data}
        onChange={onChange}
        open={open}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        filterOption={false}
        allowClear
        className="w-full"
        notFoundContent="No locations found"
      >
        <Input
          placeholder="Where are you going?"
          size="large"
          className="!h-[52px] !rounded-2xl !border-slate-200 !shadow-none transition focus:!border-blue-500"
        />
      </AutoComplete>
    </Form.Item>
  );
}
