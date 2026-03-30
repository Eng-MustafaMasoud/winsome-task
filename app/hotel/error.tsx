"use client";

import { Alert, Button } from "antd";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <Alert
        type="error"
        showIcon
        title="Failed to load hotel results"
        description={error?.message || "Please try again."}
      />

      <Button type="primary" onClick={reset} style={{ marginTop: 16 }}>
        Try Again
      </Button>
    </div>
  );
}
