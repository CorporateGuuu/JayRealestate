import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatbotWidget from "@/components/ChatbotWidget";
import PerformanceMonitor from "@/components/PerformanceMonitor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "JAY Real Estate - Your Dream Home Awaits",
  description: "Find your perfect home with JAY Real Estate. Professional real estate services, luxury properties, and expert guidance for buying, selling, and renting properties.",
  keywords: "real estate, homes for sale, property, buy house, sell house, rent, luxury homes, JAY real estate",
  authors: [{ name: "JAY Real Estate" }],
  openGraph: {
    title: "JAY Real Estate - Your Dream Home Awaits",
    description: "Find your perfect home with JAY Real Estate. Professional real estate services and luxury properties.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "JAY Real Estate - Your Dream Home Awaits",
    description: "Find your perfect home with JAY Real Estate. Professional real estate services and luxury properties.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <ChatbotWidget />
        <PerformanceMonitor />
      </body>
    </html>
  );
}
