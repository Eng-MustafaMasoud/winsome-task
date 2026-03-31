import Link from "next/link";
import { Button, Card, Result } from "antd";
import { HomeOutlined } from "@ant-design/icons";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <Card className="w-full max-w-3xl rounded-[28px] border-0 shadow-sm">
        <Result
          status="404"
          title={
            <span className="text-2xl font-semibold text-slate-900 sm:text-3xl">
              Page not found
            </span>
          }
          subTitle={
            <span className="text-sm text-slate-500 sm:text-base">
              The page you’re looking for doesn’t exist or may have been moved.
            </span>
          }
          extra={
            <Link href="/">
              <Button
                type="primary"
                size="large"
                icon={<HomeOutlined />}
                className="rounded-xl px-5"
              >
                Back to home
              </Button>
            </Link>
          }
        />
      </Card>
    </div>
  );
}
