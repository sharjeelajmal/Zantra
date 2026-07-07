import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zantrra | Trust Every Transaction",
  description: "The secure marketplace for products and services with escrow protection, service bidding, and real-time trust.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${inter.variable} light antialiased`}
    >
      <body className="bg-background text-on-background font-sans antialiased overflow-x-hidden selection:bg-primary-fixed selection:text-on-primary-fixed min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
