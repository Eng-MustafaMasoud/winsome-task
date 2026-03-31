"use client";

import { Alert, Button, Space } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

type InlineErrorAlertProps = {
  message?: string;
  description?: string;
  onRetry?: () => void;
  retryLoading?: boolean;
};

export default function InlineErrorAlert({
  message = "Couldn’t load this section",
  description = "Please refresh or try again.",
  onRetry,
  retryLoading = false,
}: InlineErrorAlertProps) {
  return (
    <div className="w-full rounded-2xl bg-white p-2">
      <Alert
        type="error"
        showIcon
        message={message}
        description={description}
        className="rounded-2xl"
        action={
          onRetry ? (
            <Space>
              <Button
                size="small"
                type="primary"
                icon={<ReloadOutlined />}
                loading={retryLoading}
                onClick={onRetry}
                className="rounded-lg"
              >
                Retry
              </Button>
            </Space>
          ) : undefined
        }
      />
    </div>
  );
}
