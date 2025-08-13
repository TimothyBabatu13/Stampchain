import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NextAuthProvider from "@/context/NextAuthProvider";
import Wallets from "@/wallets/wallets";
import { Toaster } from "@/components/ui/sonner";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StampChain",
  description: "Token-based loyalty campaigns in minutes",
  creator: '@timothy_akanbii',
  alternates: {
    canonical: 'https://stamchain-eight.vercel.com',
    languages: {
      'en-US': 'https://stamchain-eight.vercel.com',
    },
  },
  openGraph: {
    title: 'StampChain',
    description: 'Token-based loyalty campaigns in minutes',
    url: 'https://stamchain-eight.vercel.com',
    siteName: 'My Site',
    images: [{ url: 'https://example.com/og.png' }]
  },
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
        <Wallets>
          <NextAuthProvider>
            <Header />
            {children}
            <Footer />
            <Toaster />
          </NextAuthProvider>
        </Wallets>
      </body>
    </html>
  );
}
