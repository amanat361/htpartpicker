import type {} from "ldrs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "../components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HT Part Picker",
  description: "The simplest way to put together a Home Theater parts list.",
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
        <main className="flex flex-col items-center justify-center p-4 md:p-8 lg:p-10 xl:p-12">
        {/* <main> */}
          {children}
        </main>
      </body>
    </html>
  );
}
