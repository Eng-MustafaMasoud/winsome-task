"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button, Card, Result, Space, Typography } from "antd";
import {
  ReloadOutlined,
  HomeOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";

const { Paragraph, Text } = Typography;

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("App error boundary caught:", error);
  }, [error]);

  const message =
    error?.message?.trim() && error.message !== "Failed to fetch"
      ? error.message
      : "Something unexpected happened while loading this page.";

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <Card className="w-full max-w-3xl rounded-[28px] border-0 shadow-sm">
        <div className="py-4 sm:py-8">
          <Result
            status="500"
            title={
              <span className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Something went wrong
              </span>
            }
            subTitle={
              <div className="mx-auto max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                We hit a problem while rendering this page. You can try again,
                go back, or return to the homepage.
              </div>
            }
            extra={
              <Space wrap size="middle" className="justify-center">
                <Button
                  type="primary"
                  size="large"
                  icon={<ReloadOutlined />}
                  onClick={reset}
                  className="rounded-xl px-5"
                >
                  Try again
                </Button>

                <Button
                  size="large"
                  icon={<ArrowLeftOutlined />}
                  onClick={() => window.history.back()}
                  className="rounded-xl px-5"
                >
                  Go back
                </Button>

                <Link href="/">
                  <Button
                    size="large"
                    icon={<HomeOutlined />}
                    className="rounded-xl px-5"
                  >
                    Home
                  </Button>
                </Link>
              </Space>
            }
          />

          <div className="mx-auto mt-2 max-w-2xl rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
            <Paragraph className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
              Details
            </Paragraph>

            <Text className="block whitespace-pre-wrap break-words text-sm leading-6 text-slate-600">
              {message}
            </Text>

            {error?.digest ? (
              <Text className="mt-3 block text-xs text-slate-400">
                Ref: {error.digest}
              </Text>
            ) : null}
          </div>
        </div>
      </Card>
    </div>
  );
}
