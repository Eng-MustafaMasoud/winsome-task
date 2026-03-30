"use client";

import { Col, Row } from "antd";
import type { Hotel } from "../types/hotel.types";
import HotelCard from "./hotel-card";

type HotelListProps = {
  hotels: Hotel[];
};

export default function HotelList({ hotels }: HotelListProps) {
  return (
    <Row gutter={[16, 16]}>
      {hotels.map((hotel) => (
        <Col key={hotel.id} xs={24} sm={12} lg={8} xl={6}>
          <HotelCard hotel={hotel} />
        </Col>
      ))}
    </Row>
  );
}
