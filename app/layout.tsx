import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BUSINESS } from "@/lib/catalog";

export const metadata: Metadata = {
  title: `${BUSINESS.short} — Laundry & Dry Cleaning in Nasra Gardens, Nairobi`,
  description:
    "Wash & fold, dry cleaning, deep carpet & sofa cleaning, property cleaning and detergent supply. Pickup and delivery across Nairobi. Wallet Business Centre, opposite Shujaa Mall.",
  keywords: [
    "laundry Nairobi",
    "dry cleaning Kangundo Road",
    "laundromat Nasra Gardens",
    "carpet cleaning Nairobi",
    "sofa cleaning",
    "Quicklean",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root {
            --font-display: 'Bricolage Grotesque', system-ui, sans-serif;
            --font-body: 'Inter', system-ui, sans-serif;
          }
        `}</style>
      </head>
      <body className="font-sans min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
