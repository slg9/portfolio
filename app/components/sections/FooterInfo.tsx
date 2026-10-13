import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="footer">
      <div className="wrap">
        <span>{t("copyright", { year: new Date().getFullYear() })}</span>
        <a href="https://github.com/slg9/portfolio" target="_blank" rel="noopener noreferrer">
          {t("viewSource")}
        </a>
      </div>
    </footer>
  );
}
