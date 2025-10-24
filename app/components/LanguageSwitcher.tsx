"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
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
  const [currentLocale, setCurrentLocale] = useState<string>('fr');
  
  // Extract locale from pathname - more robust detection
  const getLocaleFromPath = (path: string) => {
    if (path.startsWith('/en')) return 'en';
    if (path.startsWith('/fr')) return 'fr';
    return 'fr'; // default to French
  };
  
  const localeFromPath = getLocaleFromPath(pathname);
  const hookLocale = useLocale();
  // Use localeFromPath as primary source since hookLocale seems unreliable
  const locale = localeFromPath;
  
  // Debug log (remove in production)
  console.log('LanguageSwitcher - pathname:', pathname, 'hookLocale:', hookLocale, 'localeFromPath:', localeFromPath, 'final locale:', locale);
  
  // Force re-render when pathname changes
  useEffect(() => {
    const newLocale = getLocaleFromPath(pathname);
    setCurrentLocale(newLocale);
  }, [pathname]);

  const handleLanguageChange = (newLocale: string) => {
    // Remove the current locale from the pathname
    let pathWithoutLocale = pathname;
    
    // Remove any existing locale prefix
    if (pathname.startsWith('/en')) {
      pathWithoutLocale = pathname.replace('/en', '') || '/';
    } else if (pathname.startsWith('/fr')) {
      pathWithoutLocale = pathname.replace('/fr', '') || '/';
    }
    
    // Navigate to the new locale
    router.push(`/${newLocale}${pathWithoutLocale}`);
    
    setIsOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-white/10 text-slate-700 dark:text-slate-200 hover:bg-white/80 dark:hover:bg-white/20 transition-colors"
        aria-label={t('changeLanguage')}
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="text-sm font-medium hidden sm:inline">{currentLanguage.name}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                language.code === currentLocale ? 'bg-slate-100 dark:bg-slate-700' : ''
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {language.name}
              </span>
              {language.code === currentLocale && (
                <svg className="w-4 h-4 ml-auto text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
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
