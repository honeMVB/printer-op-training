import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit' });

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
    <html lang="en" className={`dark ${inter.variable} ${outfit.variable}`}>
      <body className="font-sans bg-[#05050A] text-slate-100 antialiased min-h-screen selection:bg-cyan-500/30 selection:text-cyan-100 relative overflow-x-hidden">
        {/* Global Mesh Gradient Background */}
        <div className="fixed inset-0 z-[-1] pointer-events-none opacity-40 mix-blend-screen" style={{ backgroundImage: "url('/industrial_bg.png')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
        <div className="fixed inset-0 z-[-2] bg-gradient-to-br from-[#05050A] via-[#0A0A16] to-[#05050A]"></div>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
