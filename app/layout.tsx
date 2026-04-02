import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

const inter = localFont({
  src: [
    {
      path: "../public/fonts/inter-latin.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexArabic = localFont({
  src: [
    {
      path: "../public/fonts/ibm-plex-arabic-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/ibm-plex-arabic-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/ibm-plex-arabic-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-arabic",
  display: "swap",
});

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
    <html lang="en" className={`${inter.variable} ${ibmPlexArabic.variable}`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Z7MB548HBJ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Z7MB548HBJ');
          `}
        </Script>
      </head>
      <body className="antialiased font-[var(--font-inter)]">{children}</body>
    </html>
  );
}
