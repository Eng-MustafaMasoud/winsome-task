import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/query-provider";
import AntdProvider from "@/providers/antd-provider";
import AppFooter from "@/shared/ui/app-footer";
import AppHeader from "@/shared/ui/app-header";
import NextTopLoader from "nextjs-toploader";

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
const outlet = () => {
  <div className="">
    {children}
    <AppFooter />
  </div>;
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextTopLoader
          color="#2563eb"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px rgba(37,99,235,0.45),0 0 5px rgba(37,99,235,0.35)"
          zIndex={1600}
        />
        <QueryProvider>
          {" "}
          <AntdProvider>
            <div
              style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <AppHeader />
              <div style={{ flex: 1 }}>{children}</div>
              <AppFooter />
            </div>
          </AntdProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
