import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import NextTopLoader from "nextjs-toploader";

import "./globals.css";
import QueryProvider from "@/providers/query-provider";
import AntdProvider from "@/providers/antd-provider";
import AppHeader from "@/shared/ui/app-header";
import AppFooter from "@/shared/ui/app-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hotels App",
  description: "Hotel search platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <AntdRegistry>
          <QueryProvider>
            <AntdProvider>
              <NextTopLoader
                color="#2563eb"
                initialPosition={0.08}
                crawlSpeed={200}
                height={3}
                crawl
                showSpinner={false}
                easing="ease"
                speed={200}
                shadow="0 0 10px rgba(37,99,235,0.45), 0 0 5px rgba(37,99,235,0.35)"
                zIndex={1600}
              />

              <div className="flex min-h-screen flex-col">
                <AppHeader />
                <main className="flex-1">{children}</main>
                <AppFooter />
              </div>
            </AntdProvider>
          </QueryProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
