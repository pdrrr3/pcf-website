import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Precon Finder — Coming Soon",
  description:
    "The easiest way to discover preconstruction real estate opportunities. Launching soon.",
  icons: {
    icon: "/favicon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
