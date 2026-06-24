import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Học cùng An Nhiên",
  description: "Hệ thống học tập cá nhân hoá cho bé",
};

import BackgroundMusic from "@/components/BackgroundMusic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="font-sans">
        <Providers>
          {children}
        </Providers>
        <BackgroundMusic />
      </body>
    </html>
  );
}
