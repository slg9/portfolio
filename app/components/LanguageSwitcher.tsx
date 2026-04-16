"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' }
];

export default function LanguageSwitcher() {
  const t = useTranslations('navigation');
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  const getLocaleFromPath = (path: string) => {
    if (path.startsWith('/en')) return 'en';
    if (path.startsWith('/fr')) return 'fr';
    return 'fr';
  };
  
  const currentLocale = getLocaleFromPath(pathname);

  const handleLanguageChange = (newLocale: string) => {
    let pathWithoutLocale = pathname;
    
    if (pathname.startsWith('/en')) {
      pathWithoutLocale = pathname.replace('/en', '') || '/';
    } else if (pathname.startsWith('/fr')) {
      pathWithoutLocale = pathname.replace('/fr', '') || '/';
    }
    
    router.push(`/${newLocale}${pathWithoutLocale}`);
    setIsOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 text-sm font-medium text-slate-700 shadow-[0_10px_28px_rgba(0,0,0,0.04)] hover:bg-white dark:text-slate-200"
        aria-label={t('changeLanguage')}
      >
        <span className="text-base">{currentLanguage.flag}</span>
        <span className="hidden sm:inline">{currentLanguage.name}</span>
        <svg
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-[0_18px_42px_rgba(0,0,0,0.08)]">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-black/5 dark:hover:bg-white/5 ${
                language.code === currentLocale ? 'bg-black/5 dark:bg-white/5' : ''
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {language.name}
              </span>
              {language.code === currentLocale && (
                <svg className="ml-auto h-4 w-4 text-[var(--accent)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
