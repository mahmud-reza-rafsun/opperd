import type { Metadata } from "next";
import { Google_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Layout/Navbar/Navbar";
import GoogleProvider from "@/components/provider/GoogleProvider";
import AppToaster from "@/components/provider/app-toaster";
import { ThemeProvider } from "@/components/provider/ThemeProvider";

const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Opperd — Commodity Trade Marketplace",
  description:
    "Buy and sell commodities across agriculture, construction, FMCG, textile, and fisheries — with real-time prices, order books, and local payment support.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn(googleSans.variable)} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GoogleProvider>
            <Navbar />
            {children}
            <AppToaster />
          </GoogleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
