import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "./components/navbar";

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
        <main className="flex flex-col gap-4 items-center justify-center max-w-7xl w-full p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
