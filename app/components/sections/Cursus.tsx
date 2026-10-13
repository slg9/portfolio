import { useTranslations } from "next-intl";

// Newest first: a recruiter reads the current role before the degree.
const entries = [
  { key: "neitsa", now: true },
  { key: "willow", now: true },
  { key: "squirrel_lead" },
  { key: "squirrel_dev" },
  { key: "region" },
  { key: "ird" },
  { key: "master", education: true },
  { key: "dut", education: true },
] as const;

export default function Cursus() {
  const t = useTranslations("experience");

  return (
    <section id="cursus" className="section" aria-labelledby="cursus-title" style={{ paddingTop: 0 }}>
      <div className="wrap disco-layout">
        <h2 id="cursus-title" className="section-title">
          {t("subtitle")}
        </h2>

        <ol className="disco">
          {entries.map((e) => {
            const org = t.has(`items.${e.key}.org`) ? t(`items.${e.key}.org`) : null;
            const desc = t.has(`items.${e.key}.description`) ? t(`items.${e.key}.description`) : null;
            return (
              <li key={e.key} className={"now" in e ? "now" : undefined}>
                <time className="tnum">{t(`items.${e.key}.period`)}</time>
                <div>
                  <h3>
                    {t(`items.${e.key}.title`)}
                    {org && <span className="org">, {org}</span>}
                  </h3>
                  {"education" in e && <span className="kind">{t("education")}</span>}
                  {desc && <p>{desc}</p>}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
