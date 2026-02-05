import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from '@/components/Navbar';
import { LanguageProvider } from "./context/LanguageContext"; 
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
  title: "Balaton Hegyvidéki Apartman", // Átírtam a címet szebbre :)
  description: "Pihenés a Balatonnál",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 2. ITT KEZDŐDIK A CSOMAGOLÁS */}
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
        {/* ITT VÉGZŐDIK */}
      </body>
    </html>
  );
}