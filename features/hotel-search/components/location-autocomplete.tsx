"use client";

import { AutoComplete, Form, Input } from "antd";
import { useLocationSuggestions } from "../hooks/use-location-suggestions";

type Props = {
  value?: string;
  onChange?: (value: string) => void;
};

export default function LocationAutocomplete({ value, onChange }: Props) {
  const { data, isFetching } = useLocationSuggestions(value || "");

  return (
    <Form.Item
      label="Location"
      name="location"
      rules={[
        { required: true, message: "Please select a location" },
        { min: 2, message: "Type at least 2 characters" },
      ]}
      style={{ marginBottom: 0 }}
    >
      <AutoComplete
        value={value}
        onChange={onChange}
        options={data || []}
        placeholder="Where are you going?"
        size="large"
        allowClear
        filterOption={false}
        notFoundContent={isFetching ? "Loading..." : "No locations found"}
      >
        <Input size="large" style={{ height: 52, borderRadius: 14 }} />
      </AutoComplete>
    </Form.Item>
  );
}
