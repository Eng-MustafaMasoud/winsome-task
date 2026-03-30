import { Card, Col, Row, Skeleton } from "antd";

export default function Loading() {
  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
      <Row gutter={[16, 16]}>
        {Array.from({ length: 8 }).map((_, index) => (
          <Col key={index} xs={24} sm={12} lg={8} xl={6}>
            <Card style={{ borderRadius: 20 }}>
              <div
                style={{
                  width: "100%",
                  height: 220,
                  borderRadius: 16,
                  background: "#f1f5f9",
                  marginBottom: 16,
                }}
              />
              <Skeleton
                active
                title={{ width: "70%" }}
                paragraph={{ rows: 3 }}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
