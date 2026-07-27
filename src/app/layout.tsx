import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Commercial Printer & CNC Operator Training Course",
  description: "Comprehensive interactive online training web application for commercial wide-format printing and CNC digital finishing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-100 antialiased min-h-screen selection:bg-cyan-500 selection:text-slate-950`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
