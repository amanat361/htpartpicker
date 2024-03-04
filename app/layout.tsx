import type {} from "ldrs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "../components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HT Part Picker",
  description: "The simplest way to put together a Home Theater parts list.",
  openGraph: {
    title: "HT Part Picker",
    description: "The simplest way to put together a Home Theater parts list.",
    url: "https://htpartpicker.com",
    siteName: "htpartpicker.com",
    images: [
      {
        url: "https://www.htpartpicker.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhome-theater.893ed986.png&w=1080&q=75", // Must be an absolute URL
        width: 1080,
        height: 1080,
        alt: "Home Theater",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
