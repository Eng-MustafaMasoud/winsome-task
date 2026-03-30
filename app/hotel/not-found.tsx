import { Button, Empty, Flex } from "antd";
import Link from "next/link";

export default function NotFound() {
  return (
    <Flex
      vertical
      justify="center"
      align="center"
      style={{ minHeight: "70vh", padding: 24 }}
      gap={16}
    >
      <Empty
        description="The hotel page you are looking for was not found."
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
      <Link href="/hotel">
        <Button type="primary">Back to Hotels</Button>
      </Link>
    </Flex>
  );
}
