import type { Metadata } from "next";
import { Geist_Mono, Michroma, Orbitron, Bitcount_Grid_Double } from "next/font/google";
import "./globals.css";
import { Common } from "@/constants/constants";
import {Footer} from "@/components/Headers";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const michroma = Michroma({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
    variable: "--font-michroma",
});

const orbitron = Orbitron({
    variable: "--font-orbitron",
    subsets: ["latin"]
})

const bitcount = Bitcount_Grid_Double({
    variable: "--font-bitcount",
    subsets: ["latin", "latin-ext"]
})

export const metadata: Metadata = {
  title: Common.title,
  description: Common.description,
  keywords: ["meeting", "möte", "mötesapp", "timer", "equality", "fair", "Ylva kodar"],
  authors: [{name: "Ylva kodar"}],
  openGraph: {
      title: Common.title,
      description: Common.description,
      type: "website",
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistMono.variable} ${michroma.variable} ${orbitron.variable} ${bitcount.variable} antialiased bg-background-dark text-foreground-dark min-h-screen flex flex-col justify-between`}
      >
        {children}
      <Footer />
      </body>
    </html>
  );
}
