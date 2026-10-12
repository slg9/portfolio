import type { Metadata } from "next";
import "./globals.css";

const locales = ['fr', 'en'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Sébastien Legros | Senior Full-Stack Developer & Software Engineer",
  description: "Passionate full-stack developer specialized in React, TypeScript, Go and Node.js. 10 years of experience, including 6 in software development and 3 as technical lead, building modern web applications and robust APIs.",
  keywords: ["full-stack developer", "React", "TypeScript", "Go", "Node.js", "software engineer", "web developer", "portfolio", "Sébastien Legros"],
  authors: [{ name: "Sébastien Legros" }],
  creator: "Sébastien Legros",
  publisher: "Sébastien Legros",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/icon.png',
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
  alternates: {
    canonical: 'https://sebastienlegros.me',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}