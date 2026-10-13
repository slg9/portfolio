import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "../globals.css";
import Header from "../components/Header";
import StructuredData from "../components/StructuredData";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

// One variable family carries both voices: condensed display and normal-width text.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const locales = ['fr', 'en'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f2" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale)) return {};
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
          url: '/sebastien-pro.jpg',
          width: 1254,
          height: 1254,
          alt: t('metadata.alt'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('metadata.title'),
      description: t('metadata.description'),
      images: ['/sebastien-pro.jpg'],
    },
    alternates: {
      canonical: `https://sebastienlegros.me/${locale}`,
      languages: {
        fr: 'https://sebastienlegros.me/fr',
        en: 'https://sebastienlegros.me/en',
      },
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
  if (!locales.includes(locale)) notFound();
  setRequestLocale(locale);

  // Only the contact form runs on the client; ship just its strings.
  const messages = (await getMessages({ locale })) as any;
  const clientMessages = { contact: { form: messages.contact.form } };

  return (
    <html lang={locale}>
      <head>
        <StructuredData />
      </head>
      <body className={archivo.variable} suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={clientMessages}>
          <Header />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
