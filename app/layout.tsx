import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Vortex Compass | Gaja Bohème",
  description: "Discover the direction your current season is asking you to follow.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
