"use client";

import { Button, Form, InputNumber, Popover, Space, Typography } from "antd";
import { useMemo, useState } from "react";
import type { GuestsState } from "../types/hotel-search.types";

const { Text } = Typography;

type Props = {
  value?: GuestsState;
  onChange?: (value: GuestsState) => void;
};

const DEFAULT_GUESTS: GuestsState = {
  adults: 2,
  children: 0,
  rooms: 1,
};

export default function GuestsSelector({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const guests = value || DEFAULT_GUESTS;

  const updateGuests = (key: keyof GuestsState, nextValue: number) => {
    onChange?.({
      ...guests,
      [key]: nextValue,
    });
  };

  const summary = useMemo(() => {
    return `${guests.adults} Adults, ${guests.children} Children, ${guests.rooms} Room${guests.rooms > 1 ? "s" : ""}`;
  }, [guests]);

  const content = (
    <Space orientation="vertical" size={16} style={{ width: 260 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text>Adults</Text>
        <InputNumber
          min={1}
          max={20}
          value={guests.adults}
          onChange={(value) => updateGuests("adults", Number(value || 1))}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text>Children</Text>
        <InputNumber
          min={0}
          max={10}
          value={guests.children}
          onChange={(value) => updateGuests("children", Number(value || 0))}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text>Rooms</Text>
        <InputNumber
          min={1}
          max={10}
          value={guests.rooms}
          onChange={(value) => updateGuests("rooms", Number(value || 1))}
        />
      </div>
    </Space>
  );

  return (
    <Form.Item label="Guests" name="guests" style={{ marginBottom: 0 }}>
      <Popover
        trigger="click"
        content={content}
        open={open}
        onOpenChange={setOpen}
        placement="bottomLeft"
      >
        <Button
          size="large"
          style={{
            width: "100%",
            textAlign: "left",
            height: 52,
            borderRadius: 14,
          }}
        >
          {summary}
        </Button>
      </Popover>
    </Form.Item>
  );
}
