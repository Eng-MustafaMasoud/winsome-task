import { Col, Row, Skeleton, Card } from "antd";

export default function Loading() {
  return (
    <div style={{ padding: 24 }}>
      <Skeleton
        active
        title={{ width: 180 }}
        paragraph={{ rows: 1, width: 280 }}
        style={{ marginBottom: 24 }}
      />

      <Row gutter={[16, 16]}>
        {Array.from({ length: 8 }).map((_, index) => (
          <Col key={index} xs={24} sm={12} lg={8} xl={6}>
            <Card
              styles={{
                body: {
                  padding: 16,
                },
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: 220,
                  marginBottom: 16,
                  borderRadius: 8,
                  overflow: "hidden",
                }}
              >
                <Skeleton.Image
                  active
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>

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
