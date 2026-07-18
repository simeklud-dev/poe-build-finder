import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import EmberField from "@/components/EmberField";
import { AuthProvider } from "@/lib/auth-context";
import { LocaleProvider } from "@/i18n/LocaleContext";
import "./globals.css";

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PoE Build Finder",
  description: "Meta search engine for Path of Exile 1 and 2 builds",
  other: ADSENSE_CLIENT_ID
    ? { "google-adsense-account": ADSENSE_CLIENT_ID }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {ADSENSE_CLIENT_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        <EmberField />
        <LocaleProvider>
          <AuthProvider>
            <NavBar />
            <div className="flex-1">{children}</div>
          </AuthProvider>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
