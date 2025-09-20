import type { Metadata } from "next";
import { Geist, Geist_Mono,Manrope } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fontBody = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sébastien Legros | Software engineer ",
  description: "Sébastien Legros is a software engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"  >
      <body
        className={` ${fontBody.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <Header/>
        {children}
      </body>
    </html>
  );
}
