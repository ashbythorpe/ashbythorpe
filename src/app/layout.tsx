import type { Metadata } from "next";
import "./globals.css";
import NavHeader from "./ui/nav";
import { inter } from "./ui/fonts";
import { SpeedInsights } from "@vercel/speed-insights/remix";

export const metadata: Metadata = {
  title: "Ashby Thorpe",
  description: "Personal website of Ashby Thorpe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`text-[#000000] ${inter.className}`}>
        <div className="min-h-dvh flex flex-col">
          <NavHeader />
          {children}
        </div>
        <SpeedInsights />
      </body>
    </html>
  );
}
