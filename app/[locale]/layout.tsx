import type { Metadata } from "next";
import { Geist, Geist_Mono,Manrope } from "next/font/google";
import "../globals.css";
import Header from "../components/Header";
import StructuredData from "../components/StructuredData";
import PerformanceMonitor from "../components/PerformanceMonitor";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';


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

const locales = ['fr', 'en'];

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = messages;
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  const localeMap = {
    fr: 'fr_FR',
    en: 'en_US'
  };

  return {
    metadataBase: new URL('https://sebastienlegros.me'),
    title: t('metadata.title'),
    description: t('metadata.description'),
    keywords: t('metadata.keywords'),
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
    openGraph: {
      type: 'website',
      locale: localeMap[locale as keyof typeof localeMap] || 'fr_FR',
      url: 'https://sebastienlegros.me',
      title: t('metadata.title'),
      description: t('metadata.description'),
      siteName: t('metadata.siteName'),
      images: [
        {
          url: '/sebastien.png',
          width: 1200,
          height: 630,
          alt: t('metadata.alt'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('metadata.title'),
      description: t('metadata.description'),
      images: ['/sebastien.png'],
    },
    alternates: {
      canonical: 'https://sebastienlegros.me',
    },
    category: 'technology',
  };
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <head>
        <StructuredData />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>
      <body
        className={` ${fontBody.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <NextIntlClientProvider messages={messages}>
          <PerformanceMonitor />
          <Header/>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
