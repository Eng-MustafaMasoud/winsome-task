"use client";

import { Button, Card, InputNumber, Select, Slider, Typography } from "antd";
import {
  DollarOutlined,
  EnvironmentOutlined,
  ReloadOutlined,
  SortAscendingOutlined,
  StarOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

export type RatingFilter = number | "any";
export type SortOption =
  | "best-match"
  | "price-asc"
  | "rating-desc"
  | "distance-asc";

type Props = {
  priceRange: [number, number];
  onPriceRangeChange: (value: [number, number]) => void;
  minRating: RatingFilter;
  onMinRatingChange: (value: RatingFilter) => void;
  maxDistance: number | null;
  onMaxDistanceChange: (value: number | null) => void;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
  onReset?: () => void;
  priceMin?: number;
  priceMax?: number;
  priceStep?: number;
};

type SectionProps = {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
};

function FilterSection({ icon, title, children }: SectionProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          {icon}
        </div>
        <Text className="text-sm font-semibold text-slate-900">{title}</Text>
      </div>
      {children}
    </div>
  );
}

export default function HotelFilters({
  priceRange,
  onPriceRangeChange,
  minRating,
  onMinRatingChange,
  maxDistance,
  onMaxDistanceChange,
  sortBy,
  onSortChange,
  onReset,
  priceMin = 0,
  priceMax = 1000,
  priceStep = 10,
}: Props) {
  const [minPrice, maxPrice] = priceRange;

  const handleMinPriceChange = (value: number | null) => {
    const nextMin = Math.max(priceMin, value ?? priceMin);
    onPriceRangeChange([Math.min(nextMin, maxPrice), maxPrice]);
  };

  const handleMaxPriceChange = (value: number | null) => {
    const nextMax = Math.min(priceMax, value ?? priceMax);
    onPriceRangeChange([minPrice, Math.max(nextMax, minPrice)]);
  };

  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      onPriceRangeChange([value[0], value[1]]);
    }
  };

  return (
    <aside className="w-full xl:sticky xl:top-24">
      <Card className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50/70 shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="m-0 text-lg font-semibold tracking-tight text-slate-950">
              Filters
            </h3>

            {onReset ? (
              <Button
                icon={<ReloadOutlined />}
                onClick={onReset}
                className="h-10 rounded-xl border-slate-200 px-4"
              >
                Reset
              </Button>
            ) : null}
          </div>

          <FilterSection icon={<DollarOutlined />} title="Price range">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <InputNumber
                  min={priceMin}
                  max={priceMax}
                  step={priceStep}
                  value={minPrice}
                  onChange={handleMinPriceChange}
                  prefix="$"
                  controls={false}
                  placeholder="Min"
                  className="h-11 w-full"
                />
                <InputNumber
                  min={priceMin}
                  max={priceMax}
                  step={priceStep}
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                  prefix="$"
                  controls={false}
                  placeholder="Max"
                  className="h-11 w-full"
                />
              </div>

              <div className="px-1">
                <Slider
                  range
                  min={priceMin}
                  max={priceMax}
                  step={priceStep}
                  value={priceRange}
                  onChange={handleSliderChange}
                  tooltip={{ formatter: (value) => `$${value}` }}
                />
              </div>

              <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                <span>${minPrice}</span>
                <span>${maxPrice}</span>
              </div>
            </div>
          </FilterSection>

          <FilterSection icon={<StarOutlined />} title="Rating">
            <Select<RatingFilter>
              size="large"
              value={minRating}
              onChange={onMinRatingChange}
              className="w-full"
              options={[
                { label: "Any rating", value: "any" },
                { label: "3+ stars", value: 3 },
                { label: "4+ stars", value: 4 },
                { label: "4.5+ stars", value: 4.5 },
              ]}
            />
          </FilterSection>

          <FilterSection icon={<EnvironmentOutlined />} title="Distance">
            <Select<number | "any">
              size="large"
              value={maxDistance ?? "any"}
              onChange={(value) =>
                onMaxDistanceChange(value === "any" ? null : value)
              }
              className="w-full"
              options={[
                { label: "Any distance", value: "any" },
                { label: "Up to 1 km", value: 1 },
                { label: "Up to 3 km", value: 3 },
                { label: "Up to 5 km", value: 5 },
                { label: "Up to 10 km", value: 10 },
                { label: "Up to 15 km", value: 15 },
              ]}
            />
          </FilterSection>

          <FilterSection icon={<SortAscendingOutlined />} title="Sort by">
            <Select<SortOption>
              size="large"
              value={sortBy}
              onChange={onSortChange}
              className="w-full"
              options={[
                { label: "Best match", value: "best-match" },
                { label: "Price: low to high", value: "price-asc" },
                { label: "Top rated", value: "rating-desc" },
                { label: "Nearest first", value: "distance-asc" },
              ]}
            />
          </FilterSection>
        </div>
      </Card>
    </aside>
  );
}
