"use client";

import { ConfigProvider } from "antd";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function AntdProvider({ children }: Props) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1677ff",
          borderRadius: 8,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
