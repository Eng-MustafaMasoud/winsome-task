"use client";

import { Card, Col, Row, Skeleton } from "antd";

export default function HotelResultsSkeleton() {
  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
      <Card
        style={{
          marginBottom: 24,
          borderRadius: 20,
        }}
      >
        <Skeleton active title={{ width: 280 }} paragraph={{ rows: 2 }} />
      </Card>

      <Row gutter={[16, 16]}>
        {Array.from({ length: 8 }).map((_, index) => (
          <Col key={index} xs={24} sm={12} lg={8} xl={6}>
            <Card style={{ borderRadius: 18 }}>
              <Skeleton.Image active style={{ width: "100%", height: 220 }} />
              <Skeleton
                active
                paragraph={{ rows: 3 }}
                style={{ marginTop: 16 }}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
