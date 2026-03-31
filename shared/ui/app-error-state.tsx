"use client";

import { Button, Card, Result, Space, Typography } from "antd";
import {
  ReloadOutlined,
  HomeOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const { Paragraph, Text } = Typography;

type AppErrorStateProps = {
  title?: string;
  subtitle?: string;
  status?: "error" | "warning" | "info" | "403" | "404" | "500";
  showRetry?: boolean;
  onRetry?: () => void;
  retryLoading?: boolean;
  showBack?: boolean;
  onBack?: () => void;
  showHome?: boolean;
  compact?: boolean;
  details?: string;
};

export default function AppErrorState({
  title = "Something went wrong",
  subtitle = "We couldn’t complete your request. Please try again.",
  status = "error",
  showRetry = true,
  onRetry,
  retryLoading = false,
  showBack = false,
  onBack,
  showHome = true,
  compact = false,
  details,
}: AppErrorStateProps) {
  return (
    <Card
      className={`w-full rounded-3xl border-0 shadow-sm ${
        compact ? "p-2" : "p-4 md:p-6"
      }`}
    >
      <Result
        status={status}
        title={
          <span className="text-xl font-semibold text-slate-900">{title}</span>
        }
        subTitle={
          <div className="mx-auto max-w-xl text-sm text-slate-500">
            {subtitle}
          </div>
        }
        extra={
          <Space wrap size="middle" className="justify-center">
            {showRetry && onRetry && (
              <Button
                type="primary"
                icon={<ReloadOutlined />}
                loading={retryLoading}
                onClick={onRetry}
                className="rounded-xl"
                size="large"
              >
                Try again
              </Button>
            )}

            {showBack && onBack && (
              <Button
                icon={<ArrowLeftOutlined />}
                onClick={onBack}
                className="rounded-xl"
                size="large"
              >
                Go back
              </Button>
            )}

            {showHome && (
              <Link href="/">
                <Button
                  icon={<HomeOutlined />}
                  className="rounded-xl"
                  size="large"
                >
                  Home
                </Button>
              </Link>
            )}
          </Space>
        }
      />

      {details ? (
        <div className="mx-auto mt-2 max-w-2xl rounded-2xl bg-slate-50 p-4">
          <Paragraph className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
            Error details
          </Paragraph>
          <Text className="whitespace-pre-wrap break-words text-sm text-slate-600">
            {details}
          </Text>
        </div>
      ) : null}
    </Card>
  );
}
