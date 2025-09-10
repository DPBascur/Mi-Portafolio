import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Portafolio - DPBascur",
  description: "Mi portafolio",
};

export const viewport: Viewport = {
  themeColor: "#0B1020", // mueve themeColor aquí (Next 15+)
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-[#0B1020]">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}