"use client";

import Link from "next/link";
import { Layout, Typography } from "antd";
import { HomeOutlined, AppstoreOutlined } from "@ant-design/icons";
import { usePathname } from "next/navigation";

const { Header } = Layout;

export default function AppHeader() {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isHotels = pathname === "/hotel" || pathname.startsWith("/hotel/");

  return (
    <Header className="sticky top-0 z-[1000] border-b  border-slate-900/5 bg-white/90 px-6 py-3 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between gap-4 sm:text-md text-sm p-2">
        <Link href="/" className="flex items-center gap-1">
          <div className="flex h-8 w-6 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-blue-600 to-blue-500 text-base font-bold text-white">
            H
          </div>

          <h2 className="!mb-0 !font-bold sm:text-xl! text-lg! !tracking-[0.3px]">
            HotelFinder
          </h2>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/">
            <div
              className={[
                "flex items-center gap-2 rounded-full px-3.5 py-2 font-semibold transition-all duration-200",
                isHome
                  ? "bg-blue-600/10 text-blue-600"
                  : "bg-transparent text-slate-900",
              ].join(" ")}
            >
              <HomeOutlined />
              <span>Home</span>
            </div>
          </Link>

          <Link href="/hotel">
            <div
              className={[
                "flex items-center gap-2 rounded-full px-3.5 py-2 font-semibold transition-all duration-200",
                isHotels
                  ? "bg-blue-600/10 text-blue-600"
                  : "bg-transparent text-slate-900",
              ].join(" ")}
            >
              <AppstoreOutlined />
              <span>Hotels</span>
            </div>
          </Link>
        </div>
      </div>
    </Header>
  );
}
