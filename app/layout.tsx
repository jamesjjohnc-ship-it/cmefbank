import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const _geist = Geist({ subsets: ["latin"] });
import { AppProvider } from "@/app/context/appcontext";

export const metadata: Metadata = {
  title: "CMEF Bank | Experience the Future of Banking",
  description: "Secure, modern, and intuitive personal banking for the digital age. Manage your wealth, invest in your future, and protect your legacy with CMEF Bank.",
  openGraph: {
    title: "CMEF Bank",
    description: "Personal Banking Made Simple",
    url: "https://www.cmefgroup.com/",
    siteName: "CMEF Bank",
    images: [
      {
        url: "https://www.cmefgroup.com/logo.png",
        width: 1200,
        height: 630,
        alt: "CMEF Bank Logo",
      },
    ],
    locale: "en_US",
    type: "website",
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
