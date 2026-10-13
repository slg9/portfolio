import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { DownloadSimple, EnvelopeSimple, Path, Stack } from "@phosphor-icons/react/dist/ssr";
import { cvHref } from "../lib/cv";

const locales = ["fr", "en"] as const;

export default function Header() {
  const t = useTranslations("navigation");
  const locale = useLocale();
  const cv = cvHref(locale);

  return (
    <>
      <header className="topbar">
        <div className="wrap topbar-inner">
          <a href="#top" className="brand">
            <span className="brand-mark" aria-hidden>SL</span>
            <span className="brand-full">Sébastien Legros</span>
          </a>

          <nav className="topnav" aria-label={t("primary")}>
            <span className="topnav topnav-links">
              <a href="#projects">{t("projects")}</a>
              <a href="#techno">{t("technologies")}</a>
              <a href="#cursus">{t("experience")}</a>
              <a href="#contact">{t("contact")}</a>
              <a href={cv} download>{t("cv")}</a>
            </span>
            <span className="lang" role="group" aria-label={t("language")}>
              {locales.map((code) =>
                code === locale ? (
                  <span key={code} aria-current="true">{code}</span>
                ) : (
                  <Link key={code} href={`/${code}`} hrefLang={code} lang={code} prefetch={false}>
                    {code}
                  </Link>
                ),
              )}
            </span>
          </nav>
        </div>
      </header>

      <nav className="tabbar" aria-label={t("primary")}>
        <a href="#projects">
          <Stack size={22} weight="bold" aria-hidden />
          {t("projects")}
        </a>
        <a href="#cursus">
          <Path size={22} weight="bold" aria-hidden />
          {t("experience")}
        </a>
        <a href="#contact">
          <EnvelopeSimple size={22} weight="bold" aria-hidden />
          {t("contact")}
        </a>
        <a href={cv} download>
          <DownloadSimple size={22} weight="bold" aria-hidden />
          {t("cv")}
        </a>
      </nav>
    </>
  );
}
