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
    <div className="w-[280px]">
      <Space orientation="vertical" size={16} className="w-full">
        <div className="flex items-center justify-between gap-3">
          <Typography.Text>Adults</Typography.Text>
          <InputNumber
            min={1}
            max={20}
            value={draftGuests.adults}
            onChange={(value) => updateDraft("adults", Number(value ?? 1))}
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <Typography.Text>Children</Typography.Text>
          <InputNumber
            min={0}
            max={10}
            value={draftGuests.children}
            onChange={(value) => updateDraft("children", Number(value ?? 0))}
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <Typography.Text>Rooms</Typography.Text>
          <InputNumber
            min={1}
            max={10}
            value={draftGuests.rooms}
            onChange={(value) => updateDraft("rooms", Number(value ?? 1))}
          />
        </div>

        <div className="flex justify-end gap-2 pt-1">
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
        className="!h-[52px] !w-full !justify-start !rounded-2xl !border-slate-200 !text-left !shadow-none transition hover:!border-blue-500"
      >
        {summary}
      </Button>
    </Popover>
  );
}
