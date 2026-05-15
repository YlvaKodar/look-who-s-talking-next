import type { Metadata } from "next";
import { Geist, Geist_Mono, Michroma, Orbitron } from "next/font/google";
import "./globals.css";
import { Common } from "@/constants/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

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
        className={`${geistSans.variable} ${geistMono.variable} ${michroma.variable} ${orbitron.variable} antialiased bg-background-dark text-foreground min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
