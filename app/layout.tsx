import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Học cùng An Nhiên",
  description: "Học Toán, Tiếng Anh, Tiếng Việt vui như chơi game!",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "An Nhiên",
  },
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
