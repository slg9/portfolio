import { useTranslations } from "next-intl";

const pillars = ["build", "scale", "ship"] as const;

export default function AboutMe() {
  const t = useTranslations("about");

  return (
    <section id="aboutme" className="section" aria-labelledby="about-title">
      <div className="wrap notes-grid">
        <h2 id="about-title" className="section-title">
          {t("subtitle")}
        </h2>

        <div className="notes-cols">
          <p className="lead">{t("body")}</p>
          <p>
            <b>{t("experience_line")}</b>
          </p>
          {pillars.map((key) => (
            <p key={key}>
              <b>{t(`pillars.${key}.title`)}.</b> {t(`pillars.${key}.description`)}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
