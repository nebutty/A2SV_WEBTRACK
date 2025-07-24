
import type { Metadata } from "next";
import { Providers } from '@/redux/Provider';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// ✅ Redux
import { Provider } from "react-redux";
import { store } from "@/redux/store";

// ✅ Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ App Metadata
export const metadata: Metadata = {
  title: "Opportunities Board",
  description: "Powered by Next.js and Redux Toolkit",
};

// ✅ Root Layout
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
