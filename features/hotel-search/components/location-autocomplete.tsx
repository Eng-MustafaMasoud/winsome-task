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
      label="Location"
      name="location"
      rules={[{ required: true, message: "Please select a location" }]}
      style={{ marginBottom: 0 }}
    >
      <AutoComplete
        value={searchValue}
        options={data}
        onChange={onChange}
        open={open}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        filterOption={false}
        allowClear
        style={{ width: "100%" }}
        notFoundContent="No locations found"
      >
        <Input
          placeholder="Where are you going?"
          size="large"
          style={{ height: 52, borderRadius: 14 }}
        />
      </AutoComplete>
    </Form.Item>
  );
}
