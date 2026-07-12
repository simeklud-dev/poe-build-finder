import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NavBar from "@/components/NavBar";
import EmberField from "@/components/EmberField";
import { AuthProvider } from "@/lib/auth-context";
import "./globals.css";

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
  description: "Meta-vyhledávač buildů pro Path of Exile 1 a 2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="cs"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <EmberField />
        <AuthProvider>
          <NavBar />
          <div className="flex-1">{children}</div>
        </AuthProvider>
        <footer className="border-t px-4 py-6 text-center text-xs text-neutral-500 border-[color:var(--border-subtle)]">
          Tento web není přidružen ke Grinding Gear Games ani jimi podporován.
        </footer>
      </body>
    </html>
  );
}
