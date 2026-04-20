import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const _geist = Geist({ subsets: ["latin"] });
import { AppProvider } from "@/app/context/appcontext";

export const metadata: Metadata = {
  title: "CMEF Bank | Legacy of Trust, Future of Wealth",
  description: "Experience the pinnacle of institutional private banking. Secure, bespoke, and traditional financial solutions for wealth builders. CMEF Bank - Protecting your legacy for generations.",
  keywords: ["Private Banking", "Institutional Finance", "Wealth Management", "CMEF Bank", "Legacy Banking"],
  authors: [{ name: "CMEF Group" }],
  openGraph: {
    title: "CMEF Bank | Private Institutional Banking",
    description: "Premium banking solutions tailored for the traditional wealth builder.",
    url: "https://www.cmefgroup.com/",
    siteName: "CMEF Bank",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CMEF Private Banking - Institutional Wealth Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CMEF Bank | Legacy of Trust",
    description: "Institutional private banking for the digital age.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import Chatbot from "@/components/Chatbot";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <AppProvider>
          {children}
          <Analytics />
          <Toaster position="top-right" className="z-[100000]" />
          <Chatbot />
        </AppProvider>
      </body>
    </html>
  );
}
