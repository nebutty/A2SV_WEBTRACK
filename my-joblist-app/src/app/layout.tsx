import "./globals.css";
import { ReactNode } from "react";
import Providers from "@/redux/Provider"; // ✅ <- This file is now client
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Opportunities Board",
  description: "Powered by Next.js and Redux Toolkit",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-white text-gray-900 font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
