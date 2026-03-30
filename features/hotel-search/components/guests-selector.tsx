"use client";

import { Button, InputNumber, Popover, Space, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";
import type { GuestsState } from "../types/hotel-search.types";

const DEFAULT_GUESTS: GuestsState = {
  adults: 2,
  children: 0,
  rooms: 1,
};

type Props = {
  value?: GuestsState;
  onChange?: (value: GuestsState) => void;
};

export default function GuestsSelector({ value, onChange }: Props) {
  const committedGuests = value || DEFAULT_GUESTS;

  const [open, setOpen] = useState(false);
  const [draftGuests, setDraftGuests] = useState<GuestsState>(committedGuests);

  useEffect(() => {
    setDraftGuests(committedGuests);
  }, [committedGuests]);

  const summary = useMemo(() => {
    return `${committedGuests.adults} Adults, ${committedGuests.children} Children, ${committedGuests.rooms} Room${committedGuests.rooms > 1 ? "s" : ""}`;
  }, [committedGuests]);

  const updateDraft = (key: keyof GuestsState, nextValue: number) => {
    setDraftGuests((prev) => ({
      ...prev,
      [key]: nextValue,
    }));
  };

  const handleApply = () => {
    onChange?.(draftGuests);
    setOpen(false);
  };

  const handleCancel = () => {
    setDraftGuests(committedGuests);
    setOpen(false);
  };

  const content = (
    <div style={{ width: 280 }}>
      <Space orientation="vertical" size={16} style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <Typography.Text>Adults</Typography.Text>
          <InputNumber
            min={1}
            max={20}
            value={draftGuests.adults}
            onChange={(val) => updateDraft("adults", Number(val ?? 1))}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <Typography.Text>Children</Typography.Text>
          <InputNumber
            min={0}
            max={10}
            value={draftGuests.children}
            onChange={(val) => updateDraft("children", Number(val ?? 0))}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <Typography.Text>Rooms</Typography.Text>
          <InputNumber
            min={1}
            max={10}
            value={draftGuests.rooms}
            onChange={(val) => updateDraft("rooms", Number(val ?? 1))}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
            marginTop: 8,
          }}
        >
          <Button onClick={handleCancel}>Cancel</Button>
          <Button type="primary" onClick={handleApply}>
            Apply
          </Button>
        </div>
      </Space>
    </div>
  );

  return (
    <Popover
      trigger="click"
      content={content}
      open={open}
      onOpenChange={(nextOpen) => {
        if (nextOpen) {
          setDraftGuests(committedGuests);
        }
        setOpen(nextOpen);
      }}
      placement="bottomLeft"
    >
      <Button
        size="large"
        style={{
          width: "100%",
          height: 52,
          borderRadius: 14,
          textAlign: "left",
          justifyContent: "flex-start",
        }}
      >
        {summary}
      </Button>
    </Popover>
  );
}
