import type { Metadata } from "next";
import { Geist, Geist_Mono,Manrope } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import StructuredData from "./components/StructuredData";


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
  title: "Sébastien Legros | Développeur Full-Stack & Software Engineer",
  description: "Développeur full-stack passionné spécialisé en React, TypeScript, Go et Node.js. 5+ ans d'expérience dans le développement d'applications web modernes et d'APIs robustes. Portfolio de projets innovants et expertise technique approfondie.",
  keywords: ["développeur full-stack", "React", "TypeScript", "Go", "Node.js", "software engineer", "développeur web", "portfolio", "Sébastien Legros"],
  authors: [{ name: "Sébastien Legros" }],
  creator: "Sébastien Legros",
  publisher: "Sébastien Legros",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://sebastienlegros.me',
    title: 'Sébastien Legros | Développeur Full-Stack & Software Engineer',
    description: 'Développeur full-stack passionné spécialisé en React, TypeScript, Go et Node.js. Portfolio de projets innovants et expertise technique approfondie.',
    siteName: 'Portfolio Sébastien Legros',
    images: [
      {
        url: '/sebastien.png',
        width: 1200,
        height: 630,
        alt: 'Sébastien Legros - Développeur Full-Stack',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sébastien Legros | Développeur Full-Stack & Software Engineer',
    description: 'Développeur full-stack passionné spécialisé en React, TypeScript, Go et Node.js.',
    images: ['/sebastien.png'],
  },
  alternates: {
    canonical: 'https://sebastienlegros.me',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <StructuredData />
      </head>
      <body
        className={` ${fontBody.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <Header/>
        {children}
      </body>
    </html>
  );
}
